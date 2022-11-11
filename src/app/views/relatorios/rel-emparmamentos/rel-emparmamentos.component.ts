import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import {environment} from '../../../../environments/environment';

import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';

import { RelatoriosService } from '../../../services/relatorios.service';
import { MarcasService } from '../../../services/marcas.service';
import { ModelosService } from '../../../services/modelos.service';
import { ArmamentosService } from '../../../services/armamentos.service';
import { ArmamentosTiposService } from '../../../services/armamentos-tipos.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-rel-emparmamentos',
  templateUrl: './rel-emparmamentos.component.html',
  styleUrls: ['./rel-emparmamentos.component.css']
})
export class RelEmparmamentosComponent implements OnInit, OnDestroy {

  user: any;
  show = false;
  url = environment.imagens;
  qrcod = '';
  date = new Date();

  data$: any;
  marcas$: any;
  modelos$: any;
  usuarios$: any;
  armamentos$: any;
  armamentostipos$: any;

  month = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  datahj = '';
  datadoc = '';

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
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

  config2 = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
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

  config3 = {
    displayFn:(item: any) => { 
      if(item.numeral){
        return  item.graduacao.abreviatura+' '+item.numeral+' '+item.nome_guerra+'('+item.matricula+')'; 
      }else{
        return  item.graduacao.abreviatura+' '+item.nome_guerra+'('+item.matricula+')'; 
      }
      
    } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Usuário', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'outros', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  config4 = {
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
    //searchOnKey: 'nome' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }


  formcad = new FormGroup({
    id: new FormControl(''),
    dt_ini: new FormControl(''),  
    dt_fim: new FormControl(''),   
    marca_id: new FormControl(''),   
    modelo_id: new FormControl(''),   
    marca: new FormControl(''),   
    modelo: new FormControl(''),   
    armamento_tipo_id: new FormControl(''),   
    user_id: new FormControl(''),  
    user: new FormControl(''),   
    armamentno_id: new FormControl(''),  
    armamento: new FormControl(''),  
  });

  constructor(private session: SessionService,
    private router: Router,
    private marcas: MarcasService,
    private modelos: ModelosService,
    private usuarios: UsuariosService,
    private armamentos: ArmamentosService,
    private armamentostipos: ArmamentosTiposService,
    private relatorios: RelatoriosService) { 
      this.user = this.session.getUser();
      if(this.user.perfil.relatorios){
        this.usuarios.index2().subscribe(data => {
          this.usuarios$ = data;
        });
      }else{
        this.router.navigate(['/Inicio']);
      }
    }

  ngOnInit(): void {
   

    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();
    this.marcas.where(2).subscribe(data => {
      this.marcas$ = data;
    });

    this.armamentos.index2().subscribe(data => {
      this.armamentos$ = data;
    });

    this.armamentostipos.index().subscribe(data => {
      this.armamentostipos$ = data;
    });
  }

  ngOnDestroy(): void {

  }

  getModelos(){
    //console.log(this.formcad.value.marca);
    //@ts-ignore
    this.modelos.where(this.formcad.value.marca.id).subscribe(data => {
      this.modelos$ = data;
    });
  }

  getReport(){
    if(this.formcad.value.marca){
      //@ts-ignore
      this.formcad.controls.marca_id.patchValue(this.formcad.value.marca.id);
    }
    if(this.formcad.value.modelo){
      //@ts-ignore
      this.formcad.controls.modelo_id.patchValue(this.formcad.value.modelo.id);
    }
    if(this.formcad.value.armamento){
      //@ts-ignore
      this.formcad.controls.armamento_id.patchValue(this.formcad.value.armamento.id);
    }
    if(this.formcad.value.user){
      //@ts-ignore
      this.formcad.controls.user_id.patchValue(this.formcad.value.user.id);
    }
    this.relatorios.getEmpArmamentos(this.formcad.value).subscribe(data => {
      this.show = true;
      
      this.data$ = data;
    });
  }

  voltar(){
    this.show = false;
    this.data$ = {};
  }

}
