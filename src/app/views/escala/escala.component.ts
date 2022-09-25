import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { EscalasService } from '../../services/escalas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { EscalasUsersService } from '../../services/escalas-users.service';
import { SetoresService } from '../../services/setores.service';
import { SessionService } from '../../services/session.service';
import { UsuariosAfastamentosService } from '../../services/usuarios-afastamentos.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.css']
})
export class EscalaComponent implements OnInit {

  data$: any;
  modalidades$: any;
  usuarios$: any;
  setores$: any;
  usuariosafastamentos$: any;

  user: any;
  date = new Date();
  antiga = false;

  turno$: any;

  cadusu = false;
  usus = [];

  modalidade_id = 0;
  posto_id = 0;
  turno_id = 0;

  config = {
    displayFn:(item: any) => { return item.nome+'('+item.matricula+')'; } ,//to support flexible text displaying for each item
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
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
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
    private escalas: EscalasService,
    private escalasusers: EscalasUsersService,
    private usuarios: UsuariosService,
    private setores: SetoresService,
    private session: SessionService,
    private usuariosafastamentos: UsuariosAfastamentosService,
    private apcom: AppComponent
  ) {
    this.apcom.token = false;
      
      this.user = this.session.getUser();
      if(this.user.perfil.administrador){
        this.usuarios.index().subscribe((data) => {
          this.usuarios$ = data;
        });
      }else{
        this.router.navigate(['/']);
      }
   
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.escalas.show(userid).subscribe((data) => {
      //console.log(data);
      this.data$ = data;
      //@ts-ignore
      var date5 = new Date(data.data);
      var date2 = new Date();
      //@ts-ignore
      date2.setDate(date5.getDate()+1);

      if(this.date > date2){
        //console.log('entrou');
        this.antiga = true;
      }
      //var teste = date2.getDate()+1;
      //console.log(teste);
      //@ts-ignore
      this.dataesc = date2.getDate()+' de '+this.month[date2.getMonth()]+' de '+date2.getFullYear()+' ('+this.diasemana[date2.getDay()]+')';
    });

    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    setTimeout( () => {
      this.user = this.session.getUser();
      this.setores.where2(this.user.subunidade_id).subscribe((data) => {
        this.setores$ = data;
        this.usuariosafastamentos.ativos().subscribe((data) => {
          this.usuariosafastamentos$ = data;
          this.filterdisp();
        });
        
      });
      
      
    }, 500);
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
  }

}
