import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { CidadesService } from '../../services/cidades.service';
import { EstadosService } from '../../services/estados.service';
import { GraduacoesService } from '../../services/graduacoes.service';
import { PaisesService } from '../../services/paises.service';
import { PerfisService } from '../../services/perfis.service';
import { UsuariosService } from '../../services/usuarios.service';

import { UnidadesService } from '../../services/unidades.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { SetoresService } from '../../services/setores.service';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  user: any;

  //url = environment.imagens;

  dtOptions: any = {};

  filedata: any;
  foto$: any;

  data$: any;

  cidades$: any;
  estados$: any;
  graduacoes$: any;
  paises$: any;
  perfis$: any;

  unidades$: any;
  subunidades$: any;
  setores$: any;

  excluir$: any;

  config = {
    displayFn:(item: any) => { return item.nome+' - '+item.estado.uf; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Cidade', // text to be displayed when no item is selected defaults to Select,
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
    nome: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    matricula: new FormControl(''),
    numeral: new FormControl(''),
    nome_guerra: new FormControl(''),
    telefone1: new FormControl(''),
    telefone2: new FormControl(''),
    data_nascimento: new FormControl(''),
    data_ingresso: new FormControl(''),
    graduacao_id: new FormControl(''),
    sexo_id: new FormControl(''),
    perfil_id: new FormControl(''),

    cep: new FormControl(''),
    rua: new FormControl(''),
    numero: new FormControl(''),
    bairro: new FormControl(''),
    complemento: new FormControl(''),
    cidade_id: new FormControl(''),
    cidade: new FormControl(''),
    estado_id: new FormControl(''),
    pais_id: new FormControl(''),

    boletim_inclusao: new FormControl(''),
    boletim_entrada: new FormControl(''),
    data_apresentacao: new FormControl(''),
    boletim_saida: new FormControl(''),

    unidade_id: new FormControl(''),
    subunidade_id: new FormControl(''),
    setor_id: new FormControl(''),

    conta: new FormControl(''),

  });

  cadformfoto = new FormGroup({
    id: new FormControl(),
    foto: new FormControl()
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private cidades: CidadesService,
    private estados: EstadosService,
    private graduacoes: GraduacoesService,
    private paises: PaisesService,
    private perfis: PerfisService,
    private usuarios: UsuariosService,
    private unidades: UnidadesService,
    private subunidades: SubunidadesService,
    private setores: SetoresService) {
      
        this.user = this.session.getUser();
       
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      order: [3, 'asc'],
      //dom: 'Bfrtip',
      //buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    if(this.user.perfil.usuarios){
      this.usuarios.index().subscribe(data => {
        this.data$ = data;
        this.dtTrigger.next(this.dtOptions);
      }); 
    }else{
      this.router.navigate(['/Inicio']);
    }

    this.graduacoes.index().subscribe(data => {
      this.graduacoes$ = data;      
    }); 

    this.paises.index().subscribe(data => {
      this.paises$ = data;      
    }); 

    this.perfis.index().subscribe(data => {
      this.perfis$ = data;      
    }); 

    this.unidades.index().subscribe(data => {
      this.unidades$ = data;      
    });
    //console.log(this.usuarios.getUsuarios());
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    
  }

  refresh(){
    this.usuarios.index().subscribe(data => {
      this.data$ = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(this.dtOptions);
      });
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

  getSubunidades(){
    //@ts-ignore
    this.subunidades.where(this.formcad.value.unidade_id).subscribe(data => {
      this.subunidades$ = data;
    });
  }

  getSetores(){
    //@ts-ignore
    this.setores.where(this.formcad.value.subunidade_id).subscribe(data => {
      this.setores$ = data;
    });
  }

  teste(data:any){
    console.log(data);
  }

  editar(data:any){
    //@ts-ignore
    this.subunidades.where(data.subunidade.unidade_id).subscribe(data => {
      this.subunidades$ = data;
    });
    //@ts-ignore
    this.setores.where(data.subunidade_id).subscribe(data => {
      this.setores$ = data;
    });  
    //@ts-ignore
    this.estados.where(data.cidade?.estado?.pais_id).subscribe(data => {
      this.estados$ = data;
    });
    //@ts-ignore
    this.cidades.where(data.cidade?.estado_id).subscribe(data => {
      this.cidades$ = data;
    });
    this.formcad.patchValue(data);
    this.formcad.controls.estado_id.patchValue(data.cidade?.estado_id);
    this.formcad.controls.pais_id.patchValue(data.cidade?.estado?.pais_id);
    this.formcad.controls.unidade_id.patchValue(data.subunidade.unidade_id);
  }

  salvar(){
    if(!this.user.perfil.administador && !this.formcad.value.perfil_id){
      this.formcad.controls.perfil_id.patchValue('4');
    }
    //@ts-ignore
    this.formcad.controls.cidade_id.patchValue(this.formcad.value.cidade.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.usuarios.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.usuarios.store(this.formcad.value).subscribe(data => {
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
    this.usuarios.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  resetpass(data:any){
    let isExecuted = confirm("Tem certeza que resetar a senha de "+data.nome+"?");

    if(isExecuted){
      this.usuarios.resetpass(data.id).subscribe(data => {
        if(data == 1){
          this.refresh();   
         
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }    
  }

  foto(data: any){
    this.foto$ = data;
  }

  fileEvent(e: any){
    this.filedata = e.target.files[0];
    //console.log(this.filedata);

    var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      myFormData.append('id', this.foto$.id);
      /* Image Post Request */
      this.http.post('/api/usuarios-foto', myFormData, {
      headers: headers
      }).subscribe(data => {
        if(data == 1){
          this.cadformfoto.reset();
          this.refresh();
          this.toastr.success('Informação editada com sucesso!');  
        }
    });  
  }
  

}
