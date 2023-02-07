import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { MateriaisService } from '../../services/materiais.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MateriaisEmprestimosService } from '../../services/materiais-emprestimos.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-materiais-emprestimos',
  templateUrl: './materiais-emprestimos.component.html',
  styleUrls: ['./materiais-emprestimos.component.css']
})
export class MateriaisEmprestimosComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  p = 1;

  user: any;

  dtOptions: any = {};

  data$: any;
  materiais$: any;
  usuarios$: any;
  mats: any = [];
  excluir$: any;

  config = {
    displayFn:(item: any) => { 
      
        return item.material_tipo.nome+' - '+item.serial+' ('+item.marca.nome+'/'+item.modelo.nome+')'; 
      
    } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Material', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  config2 = {
    displayFn:(item: any) => { return item.nome+' ('+item.matricula+')'; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Policial', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'outros', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '350',
    minHeight: '350',
    maxHeight: '350',
    width: 'auto',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Informe aqui o texto do documento...',
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
    material: new FormControl(''),  
    materiais: new FormControl([]),  
    user_id: new FormControl(''), 
    user: new FormControl(''), 
    quant: new FormControl(''), 
    data_emp: new FormControl(''), 
    hora_emp: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  formcad2 = new FormGroup({
    id: new FormControl(''),
    data_dev: new FormControl(''), 
    hora_dev: new FormControl(''), 
    material_id: new FormControl(''), 
    danificado: new FormControl(''), 
    extraviado: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private materiaisemprestimos: MateriaisEmprestimosService,
    private materiais: MateriaisService,
    private usuarios: UsuariosService) { 

        this.user = this.session.getUser();
        

     
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      order: [0, 'desc'],
     //dom: 'Bfrtip',
      //buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    if(this.user.perfil.armamentos_emprestimos){
      this.materiaisemprestimos.index().subscribe(data => {
        this.data$ = data;
        this.dtTrigger.next(this.dtOptions);
      }); 
    }else{
      this.router.navigate(['/Inicio']);
    }

    this.materiais.index2().subscribe(data => {
      this.materiais$ = data;
    }); 

    this.usuarios.index2().subscribe(data => {
      this.usuarios$ = data;
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.materiaisemprestimos.index().subscribe(data => {
      this.data$ = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(this.dtOptions);
      });
    }); 
  }

  editar(data:any){   
    
    this.formcad.patchValue(data);    
  }

  salvar(){
    //@ts-ignore
    this.formcad.controls.materiais.patchValue(this.mats);
    
    /*console.log(this.formcad.value);*/
    
    //@ts-ignore
    this.formcad.controls.user_id.patchValue(this.formcad.value.user.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.materiaisemprestimos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.materiaisemprestimos.store(this.formcad.value).subscribe(data => {
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
    this.materiaisemprestimos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  addMaterial(){
    var data = this.formcad.value.material;
    if(this.formcad.value.quant){
      //@ts-ignore      
      data.quant = this.formcad.value.quant;
    }    

    //@ts-ignore
    this.mats.push(data);
   //this.formcad.value.armamentos?.push(this.formcad.value.armamento);
   this.formcad.controls.quant.patchValue('');
   this.formcad.controls.material.patchValue('');
    //console.log(this.arms);
  }

  delMaterial(id:number){
    this.mats[id].quant = null;
    this.mats[id].carregadores = null;
    //console.log(id);
    this.mats.splice(id, 1);
  }

  receber(data:any){
    this.formcad2.patchValue(data);
  }

  salvarreceber(){
    
    this.materiaisemprestimos.receber(this.formcad2.value).subscribe(data => {
      if(data == 1){
        this.formcad2.reset();
        this.refresh();    
        this.toastr.success('Informação editada com sucesso!');  
      }
    });
  }

}
