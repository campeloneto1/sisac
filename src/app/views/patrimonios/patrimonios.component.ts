import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { PatrimoniosService } from '../../services/patrimonios.service';
import { PatrimoniosTiposService } from '../../services/patrimonios-tipos.service';
import { SetoresService } from '../../services/setores.service';

@Component({
  selector: 'app-patrimonios',
  templateUrl: './patrimonios.component.html',
  styleUrls: ['./patrimonios.component.css']
})
export class PatrimoniosComponent implements OnInit,OnDestroy {

  p = 1;

  user: any;

  dtOptions: any = {};

  data$: any;
  setores$: any;
  patrimoniostipos$: any;

  excluir$: any;
  reparar$: any;

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Setor', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    //searchOnKey: 'nome' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '500',
      minHeight: '500',
      maxHeight: '500',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Observações...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      toolbarHiddenButtons : [
        [
          'insertImage',
          'insertVideo',
          'toggleEditorMode'
        ]
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    
  };

  formcad = new FormGroup({
    id: new FormControl(''),
    serial: new FormControl(''), 
    patrimonio_tipo_id: new FormControl(''),  
    patrimonio_tipo: new FormControl(''),
    setor: new FormControl(''), 
    setor_id: new FormControl(''), 
    data_baixa: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private patrimonios: PatrimoniosService,
    private patrimoniostipos: PatrimoniosTiposService,
    private setores: SetoresService) { 

        this.user = this.session.getUser();
        if(this.user.perfil.patrimonios){
          this.patrimonios.index().subscribe(data => {
            this.data$ = data;
            this.dtTrigger.next();
          }); 
        }else{
          this.router.navigate(['/Inicio']);
        }
     

    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      order: [[1, 'asc'],[2, 'asc'],[3, 'asc'],[4, 'asc']],
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    this.setores.index().subscribe(data => {
      this.setores$ = data;
    });

    this.patrimoniostipos.index().subscribe(data => {
      this.patrimoniostipos$ = data;
    });

    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.patrimonios.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  editar(data:any){   
    this.formcad.patchValue(data);  
  }

  salvar(){
    //@ts-ignore
    this.formcad.controls.setor_id.patchValue(this.formcad.value.setor.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.patrimonios.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.patrimonios.store(this.formcad.value).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação cadastrada com sucesso!');  
        }
      });
    }
  }

  deletar(data:any){
    this.excluir$ = data;
  }

  confirm(){
    this.patrimonios.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }
}
