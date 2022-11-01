import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { CidadesService } from '../../services/cidades.service';
import { EstadosService } from '../../services/estados.service';
import { PaisesService } from '../../services/paises.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { UnidadesService } from '../../services/unidades.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-subunidades',
  templateUrl: './subunidades.component.html',
  styleUrls: ['./subunidades.component.css']
})
export class SubunidadesComponent implements OnInit, OnDestroy {

  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;

  cidades$: any;
  estados$: any;
  paises$: any;
  unidades$: any;
  usuarios$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    
    unidade_id: new FormControl(''),  

    nome: new FormControl(''),  
    abreviatura: new FormControl(''),  
    email: new FormControl(''),  
    telefone1: new FormControl(''),  
    telefone2: new FormControl(''), 
    
    comandante_id: new FormControl(''),  
    subcomandante_id: new FormControl(''),  

    rua: new FormControl(''),  
    numero: new FormControl(''),  
    bairro: new FormControl(''),  
    complemento: new FormControl(''),  
    cep: new FormControl(''),  
    cidade_id: new FormControl(''),  
    estado_id: new FormControl(''),  
    pais_id: new FormControl(''),  

  });

  config = {
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

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private cidades: CidadesService,
    private estados: EstadosService,
    private paises: PaisesService,
    private subunidades: SubunidadesService,
    private unidades: UnidadesService,
    private usuarios: UsuariosService) {

        this.user = this.session.getUser();
        if(this.user.perfil.administrador){
          this.subunidades.index().subscribe(data => {
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
      pageLength: 10
    };

   

    this.unidades.index().subscribe(data => {
      this.unidades$ = data;
    });

    this.usuarios.index2().subscribe(data => {
      this.usuarios$ = data;
    });
    
    this.paises.index().subscribe(data => {
      this.paises$ = data;      
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.subunidades.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  getEstados(){
    //@ts-ignore
    this.estados.where(this.formcad.value.pais_id).subscribe(data => {
      this.estados$ = data;
    });
  }

  getCidades(){
    //@ts-ignore
    this.cidades.where(this.formcad.value.estado_id).subscribe(data => {
      this.cidades$ = data;
    });
  }

  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.subunidades.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.subunidades.store(this.formcad.value).subscribe(data => {
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
    this.subunidades.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
