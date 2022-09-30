import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { VeiculosService } from '../../services/veiculos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { VeiculosEmprestimosService } from '../../services/veiculos-emprestimos.service';

@Component({
  selector: 'app-veiculos-emprestimos',
  templateUrl: './veiculos-emprestimos.component.html',
  styleUrls: ['./veiculos-emprestimos.component.css']
})
export class VeiculosEmprestimosComponent implements OnInit,OnDestroy {

  p = 1;

  user: any;

  dtOptions: any = {};

  data$: any;
  veiculos$: any;
  usuarios$: any;

  excluir$: any;

  config = {
    displayFn:(item: any) => { 
      if(item.placa_esp){
        return item.placa_esp+' ('+item.marca.nome+'/'+item.modelo.nome+')'; 
      }else{
        return item.placa+' ('+item.marca.nome+'/'+item.modelo.nome+')'; 
      }
    } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Veículo', // text to be displayed when no item is selected defaults to Select,
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
    veiculo_id: new FormControl(''),
    veiculo: new FormControl(''),  
    user_id: new FormControl(''), 
    user: new FormControl(''), 
    data_saida: new FormControl(''), 
    hora_saida: new FormControl(''), 
    km_inicial: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  formcad2 = new FormGroup({
    id: new FormControl(''),
    data_chegada: new FormControl(''), 
    hora_chegada: new FormControl(''), 
    km_final: new FormControl(''), 
    veiculo_id: new FormControl(''), 
    observacoes: new FormControl(''), 
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private emprestimos: VeiculosEmprestimosService,
    private veiculos: VeiculosService,
    private usuarios: UsuariosService) { 

        this.user = this.session.getUser();
        if(this.user.perfil.veiculos_emprestimos){
          this.emprestimos.index().subscribe(data => {
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

    this.veiculos.index2().subscribe(data => {
      this.veiculos$ = data;
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
    this.emprestimos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  editar(data:any){   
    
    this.formcad.patchValue(data);    
  }

  salvar(){
    //@ts-ignore
    this.formcad.controls.veiculo_id.patchValue(this.formcad.value.veiculo.id);
    //@ts-ignore
    this.formcad.controls.km_inicial.patchValue(this.formcad.value.veiculo.km_atual);
    //@ts-ignore
    this.formcad.controls.user_id.patchValue(this.formcad.value.user.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.emprestimos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.emprestimos.store(this.formcad.value).subscribe(data => {
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
    this.emprestimos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  receber(data:any){
    this.formcad2.patchValue(data);
  }

  salvarreceber(){
    this.emprestimos.receber(this.formcad2.value).subscribe(data => {
      if(data == 1){
        this.formcad2.reset();
        this.refresh();    
        this.toastr.success('Informação editada com sucesso!');  
      }
    });
  }

}
