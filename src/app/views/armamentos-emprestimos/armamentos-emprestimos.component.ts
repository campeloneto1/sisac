import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { ArmamentosService } from '../../services/armamentos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosArmamentosService } from '../../services/usuarios-armamentos.service';

@Component({
  selector: 'app-armamentos-emprestimos',
  templateUrl: './armamentos-emprestimos.component.html',
  styleUrls: ['./armamentos-emprestimos.component.css']
})
export class ArmamentosEmprestimosComponent implements OnInit {

  p = 1;

  user: any;

  dtOptions: any = {};

  data$: any;
  armamentos$: any;
  usuarios$: any;
  arms: any = [];
  excluir$: any;

  config = {
    displayFn:(item: any) => { 
      
        return item.armamento_tipo.nome+' - '+item.serial+' ('+item.marca.nome+'/'+item.modelo.nome+')'; 
      
    } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Armamento', // text to be displayed when no item is selected defaults to Select,
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
    armamento: new FormControl(''),  
    armamentos: new FormControl([]),  
    user_id: new FormControl(''), 
    user: new FormControl(''), 
    quant: new FormControl(''), 
    carregadores: new FormControl(''), 
    data_emp: new FormControl(''), 
    hora_emp: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  formcad2 = new FormGroup({
    id: new FormControl(''),
    data_dev: new FormControl(''), 
    hora_dev: new FormControl(''), 
    armamento_id: new FormControl(''), 
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
    private armamentosemprestimos: UsuariosArmamentosService,
    private armamentos: ArmamentosService,
    private usuarios: UsuariosService) { 

        this.user = this.session.getUser();
        if(this.user.perfil.armamentos_emprestimos){
          this.armamentosemprestimos.index().subscribe(data => {
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
      order: [0, 'desc'],
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    this.armamentos.index2().subscribe(data => {
      this.armamentos$ = data;
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
    this.armamentosemprestimos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  editar(data:any){   
    
    this.formcad.patchValue(data);    
  }

  salvar(){
    //@ts-ignore
    this.formcad.controls.armamentos.patchValue(this.arms);
    
    /*console.log(this.formcad.value);*/
    
    //@ts-ignore
    this.formcad.controls.user_id.patchValue(this.formcad.value.user.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.armamentosemprestimos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.armamentosemprestimos.store(this.formcad.value).subscribe(data => {
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
    this.armamentosemprestimos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  addArmamento(){
    var data = this.formcad.value.armamento;
    if(this.formcad.value.quant){
      //@ts-ignore      
      data.quant = this.formcad.value.quant;
    }

    if(this.formcad.value.carregadores){
      //@ts-ignore      
      data.carregadores = this.formcad.value.carregadores;
    }


    //@ts-ignore
    this.arms.push(data);
   //this.formcad.value.armamentos?.push(this.formcad.value.armamento);
   this.formcad.controls.quant.patchValue('');
   this.formcad.controls.carregadores.patchValue('');
   this.formcad.controls.armamento.patchValue('');
    //console.log(this.arms);
  }

  delArmamento(id:number){
    this.arms[id].quant = null;
    this.arms[id].carregadores = null;
    //console.log(id);
    this.arms.splice(id, 1);
  }

  receber(data:any){
    this.formcad2.patchValue(data);
  }

  salvarreceber(){
    
    this.armamentosemprestimos.receber(this.formcad2.value).subscribe(data => {
      if(data == 1){
        this.formcad2.reset();
        this.refresh();    
        this.toastr.success('Informação editada com sucesso!');  
      }
    });
  }

}
