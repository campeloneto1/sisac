import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { ArmamentosService } from '../../services/armamentos.service';
import { ArmamentosTiposService } from '../../services/armamentos-tipos.service';
import { MarcasService } from '../../services/marcas.service';
import { ModelosService } from '../../services/modelos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosArmamentosService } from '../../services/usuarios-armamentos.service';

@Component({
  selector: 'app-armamentos',
  templateUrl: './armamentos.component.html',
  styleUrls: ['./armamentos.component.css']
})
export class ArmamentosComponent implements OnInit, OnDestroy {

  p = 1;

  user: any;

  dtOptions: any = {};

  cadus = false;

  data$: any;
  marcas$: any;
  modelos$: any;
  armamentostipos$: any;
  usuarios$: any;
  armamento$: any;

  usus = 0;

  excluir$: any;
  reparar$: any;

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Tipo', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    //searchOnKey: 'nome' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  config2 = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Marca', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    //searchOnKey: 'nome' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  config3 = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Modelo', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    //searchOnKey: 'nome' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  config4 = {
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
      height: '500',
      minHeight: '500',
      maxHeight: '500',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
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
    armamento_tipo_id: new FormControl(''),  
    armamento_tipo: new FormControl(''),
    marca_id: new FormControl(''), 
    marca: new FormControl(''), 
    modelo_id: new FormControl(''), 
    modelo: new FormControl(''), 
    data_venc: new FormControl(''), 
    data_baixa: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  formcad2 = new FormGroup({
    id: new FormControl(''),
    data_emp: new FormControl(''),
    data_dev: new FormControl(''), 
    danificado: new FormControl(''), 
    extraviado: new FormControl(''), 
    user: new FormControl(''), 
    user_id: new FormControl(''), 
    armamento_id: new FormControl(''), 
    quant: new FormControl(''),  
    observacoes: new FormControl(''),
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private armamentos: ArmamentosService,
    private armamentostipos: ArmamentosTiposService,
    private marcas: MarcasService,
    private modelos: ModelosService,
    private usuarios: UsuariosService,
    private usuariosarmamentos: UsuariosArmamentosService) { 
      

      
        this.user = this.session.getUser();
        if(this.user.perfil.armamentos){
          this.armamentos.index().subscribe(data => {
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

    this.marcas.where(2).subscribe(data => {
      this.marcas$ = data;
    });

    this.armamentostipos.index().subscribe(data => {
      this.armamentostipos$ = data;
    });
    /*
    this.usuarios.index2().subscribe(data => {
      this.usuarios$ = data;
    });*/
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.armamentos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  getModelos(){
    //@ts-ignore
    this.modelos.where(this.formcad.value.marca.id).subscribe(data => {
      this.modelos$ = data;
    });
  }


  editar(data:any){   
    this.formcad.patchValue(data);  
    
    //@ts-ignore
    this.modelos.where(this.formcad.value.marca.id).subscribe(data => {
      this.modelos$ = data;
    });
  }

  salvar(){
    //@ts-ignore
    this.formcad.controls.armamento_tipo_id.patchValue(this.formcad.value.armamento_tipo.id);
    //@ts-ignore
    this.formcad.controls.marca_id.patchValue(this.formcad.value.marca.id);
    //@ts-ignore
    this.formcad.controls.modelo_id.patchValue(this.formcad.value.modelo.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.armamentos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.armamentos.store(this.formcad.value).subscribe(data => {
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
    this.armamentos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  reparar(data:any){
    this.reparar$ = data;
  }

  confirmrep(){
    this.armamentos.reparar(this.reparar$.id).subscribe(data => {
      if(data == 1){
        this.refresh();   
        
        this.toastr.success('Informação editada com sucesso!');  
      }
    });
  }
  

  showUsuarios(data:any){
    this.armamento$ = data;
    this.cadus = false;
  }

  cadusu(){
    this.cadus = true;
  }

  deletarusu(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.nome+"?");

    if(isExecuted){
      this.usuariosarmamentos.destroy(data.pivot.id).subscribe(data => {
        if(data == 1){
          this.refresh();   
          this.armamentos.show(this.armamento$.id).subscribe(data => {
            this.armamento$ = data;
          });
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }    
  }

  cadastrarusu(){
    if(this.formcad2.value.id){
      //@ts-ignore
      this.usuariosarmamentos.update(this.formcad2.value, this.formcad2.value.id).subscribe(data => {
        this.formcad2.reset();
        this.cadus = false;
        this.refresh();   
        this.armamentos.show(this.armamento$.id).subscribe(data => {
          this.armamento$ = data;
        });
        this.toastr.success('Informação editada com sucesso!');  
      });
    }else{
      this.formcad2.controls.armamento_id.patchValue(this.armamento$.id);
      //@ts-ignore
      this.formcad2.controls.user_id.patchValue(this.formcad2.value.user.id);
      //console.log(this.formcad2.value);
      /**/
      this.usuariosarmamentos.store(this.formcad2.value).subscribe(data => {
        this.formcad2.reset();
        this.cadus = false;
        this.refresh();   
        this.armamentos.show(this.armamento$.id).subscribe(data => {
          this.armamento$ = data;
        });
        this.toastr.success('Informação cadastrada com sucesso!');  
      });
    }
  }

  devarmamento(data:any){
    this.formcad2.controls.id.patchValue(data.pivot.id);
    this.formcad2.controls.observacoes.patchValue(data.pivot.observacoes);
    this.formcad2.controls.data_dev.patchValue(data.pivot.data_dev);
    this.formcad2.controls.danificado.patchValue(data.pivot.danificado);
    this.formcad2.controls.extraviado.patchValue(data.pivot.extraviado);
    this.cadus = true;
  }

}
