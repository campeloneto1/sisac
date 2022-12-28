import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EscalasService } from '../../services/escalas.service';

import { AdministracaoService } from '../../services/administracao.service';
import { AfastamentosTiposService } from '../../services/afastamentos-tipos.service';
import { AppComponent } from 'src/app/app.component';
import { EscalasUsersService } from '../../services/escalas-users.service';
import { UsuariosService } from '../../services/usuarios.service';
import { SetoresService } from '../../services/setores.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { SessionService } from '../../services/session.service';
import { TurnosService } from '../../services/turnos.service';
import { UsuariosAfastamentosService } from '../../services/usuarios-afastamentos.service';
import { UsuariosFeriasService } from '../../services/usuarios-ferias.service';



@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.css']
})
export class EscalaComponent implements OnInit {
  url = environment.imagens;
  data$: any;
  modalidades$: any;
  usuarios$: any;
  setores$: any;
  usuariosafastamentos$: any;
  usuariosferias$: any;
  afastamentostipos$: any;
  administracao$: any;
  ausente$: any;
  turnos$: any;
  quantadm$= 0;
  quanttotal$= 0;
  opcao: any;
  data: any;
  dias: any;

  user: any;
  date = new Date();
  antiga = false;
  fds = false;
  atual = false;
  subunidade$: any;
  turno$: any;

  cadusu = false;
  usus = [];

  modalidade_id = 0;
  posto_id = 0;
  turno_id = 0;

  formcadfalta = new FormGroup({
    id: new FormControl(''),
    user_id: new FormControl(''),
    afastamento_tipo_id: new FormControl(''),
    opcao: new FormControl(''),
    data: new FormControl(''),  
    dias: new FormControl(''),  
    cid: new FormControl(''),  

  });

  config = {
    displayFn:(item: any) => { 
      if(item.numeral){
        return  item.graduacao.abreviatura+' '+item.numeral+' '+item.nome_guerra+'('+item.matricula+')'; 
      }else{
        return  item.graduacao.abreviatura+' '+item.nome_guerra+'('+item.matricula+')'; 
      }
      
    } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
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

  month = [
    '',
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
    'dezembro'
  ];

  diasemana = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado'
  ];

  datahj = '';
  dataesc = '';

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private administracao: AdministracaoService,
    private escalas: EscalasService,
    private escalasusers: EscalasUsersService,
    private usuarios: UsuariosService,
    private setores: SetoresService,
    private subunidades: SubunidadesService,
    private session: SessionService,
    private turnos: TurnosService,
    private usuariosafastamentos: UsuariosAfastamentosService,
    private usuariosferias: UsuariosFeriasService,
    private afastamentostipos: AfastamentosTiposService,
    private apcom: AppComponent
  ) {
    //this.apcom.token = false;
      
      this.user = this.session.getUser();
      if(this.user.perfil.escalas || this.user.perfil.oficial_dia ){
        this.usuarios.index2().subscribe((data) => {
          this.usuarios$ = data;
        });
      }else{
        this.router.navigate(['/']);
      }
   
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));
    this.user = this.session.getUser();
    this.escalas.show(userid).subscribe((data) => {
      //console.log(data);
      this.data$ = data;
      var teste = this.data$.data.split('-');

      var date2 = new Date(teste[0], teste[1]-1, teste[2]);

      var dateteste = this.date.getFullYear()+'-'+(this.date.getMonth()+1)+'-'+this.date.getDate();
      var dateteste2 = date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate();
      
      var comp = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

      if(date2.getDay() == 0 || date2.getDay() == 6){
        this.fds = true;
        console.log('entrou fds')
      }

      if(comp > date2){
        //console.log('entrou1');
        this.antiga = true;
      }
      
      if(dateteste == dateteste2){
        //console.log('entrou2');
        this.atual = true;
      }
      
      //@ts-ignore
      this.dataesc = date2.getDate()+' de '+this.month[date2.getMonth()+1]+' de '+date2.getFullYear()+' ('+this.diasemana[date2.getDay()]+')';

      this.subunidades.show(this.data$.subunidade_id).subscribe((data) => {
        this.subunidade$ = data;
      });

      this.administracao.index().subscribe(data => {
        this.administracao$ = data;
      });

      if(this.data$.escala_modelo.administrativo){
        setTimeout( () => {
          this.setores.where2(this.user.subunidade_id).subscribe((data) => {
            this.setores$ = data;
            this.usuariosafastamentos.ativos().subscribe((data) => {
              this.usuariosafastamentos$ = data;
              this.usuariosferias.ativos().subscribe((data) => {
                this.usuariosferias$ = data;
                this.filterdisp();

              });
              //this.filterdisp();
            });


           
          });
        }, 500);
      }
      this.quanttotal$= 0;
      this.turnos.index().subscribe(data => {
        this.turnos$ = data;
        for (let index = 0; index < this.turnos$.length; index++) {
          this.turnos$[index].quant = 0
          
        }
        for (let index = 0; index < this.data$.usuarios.length; index++) {
          for (let index2 = 0; index2 < this.turnos$.length; index2++) {
            if(this.data$.usuarios[index].pivot.turno_id == this.turnos$[index2].id){
              this.turnos$[index2].quant++;
            }
          }        
        }
        //console.log(this.turnos$)
        
      });
      
    });

    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()+1]+' de '+this.date.getFullYear();

    this.afastamentostipos.index().subscribe(data => {
      this.afastamentostipos$ = data;
    });
    

   
    
   
  }

  refresh(){
    this.escalas.show(this.data$.id).subscribe(data => {
      this.data$ = data;
    });
  }

  getTurno(data:any, data2:any, data3:any){
    //console.log(data);
    this.turno$ = data3;
    //console.log(data);
    //console.log(data2);
    //console.log(data3);
    this.modalidade_id = data.id;
    this.posto_id = data2.id;
    this.turno_id = data3.id;
  }

  getUsus(){
    this.cadusu = true;
    this.usus = [];
  }

  postUsuarios(){
    var teste = [];
    teste[0] = this.data$.id;   
    teste[1] = this.modalidade_id;
    teste[2] = this.posto_id;
    teste[3] = this.turno_id;
    teste[4] = this.usus;
    console.log(teste);
    this.escalasusers.store(teste).subscribe(data => {
      if(data == 1){
        this.refresh();   
        this.usus = [];
        this.toastr.success('Informação excluída com sucesso!');  
      }
    });
  }

  deletarUsu(data: any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.nome+"?");

    if(isExecuted){
      this.escalasusers.destroy(data.pivot.id).subscribe(data => {
        if(data == 1){
          this.refresh();   
          
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }  
  }

  filterUsus(usus:any, modalidade:any, posto:any, turno:any){
    //@ts-ignore
    return usus.filter(p => p.pivot.modalidade_id == modalidade && p.pivot.posto_id == posto && p.pivot.turno_id == turno );
  }

  filterdisp(){
    for (let index = 0; index < this.setores$.length; index++) {
      for (let index2 = 0; index2 < this.setores$[index].users.length; index2++) {
        for (let index3 = 0; index3 < this.data$.dispensas.length; index3++) {
          if(this.setores$[index].users[index2]){
            if(this.setores$[index].users[index2].id == this.data$.dispensas[index3].id){
              delete this.setores$[index].users[index2];           
            }
          }
          
        }   
      }     
    }

    for (let index = 0; index < this.setores$.length; index++) {
      for (let index2 = 0; index2 < this.setores$[index].users.length; index2++) {
        for (let index3 = 0; index3 < this.usuariosafastamentos$.length; index3++) {
          if(this.setores$[index].users[index2]){
            if(this.setores$[index].users[index2].id == this.usuariosafastamentos$[index3].user_id){
              delete this.setores$[index].users[index2];           
            }
          }
          
        }   
      }     
    }

    for (let index = 0; index < this.setores$.length; index++) {
      for (let index2 = 0; index2 < this.setores$[index].users.length; index2++) {
        for (let index3 = 0; index3 < this.usuariosferias$.length; index3++) {
          if(this.setores$[index].users[index2]){
            if(this.setores$[index].users[index2].id == this.usuariosferias$[index3].user_id){
              delete this.setores$[index].users[index2];           
            }
          }
          
        }   
      }     
    }

    for (let index = 0; index < this.setores$.length; index++) {
      for (let index2 = 0; index2 < this.setores$[index].users.length; index2++) {
        if(this.setores$[index].users[index2]){
          this.quantadm$++;
        }
      }
    }

    this.quanttotal$ = this.turnos$[0].quant + this.turnos$[1].quant + this.quantadm$;
  }

  ausente(data:any){
    this.formcadfalta.reset();
    //console.log(data);
    this.ausente$ = data;
  }

  registrar(){
    //console.log(this.ausente$);
   this.formcadfalta.controls.id.patchValue(this.ausente$.pivot.id);
   this.formcadfalta.controls.user_id.patchValue(this.ausente$.id);

    //console.log(array);
    
    this.escalasusers.falta(this.formcadfalta.value).subscribe(data => {
      if(data == 1){
        this.toastr.success('Informação cadastrada com sucesso!'); 
        this.refresh();
      }
    });
  }

}
