import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {environment} from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../services/usuarios.service';
import { GraduacoesService } from '../../services/graduacoes.service';
import { UsuariosPromocoesService } from '../../services/usuarios-promocoes.service';
import { UsuariosFeriasService } from '../../services/usuarios-ferias.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: any;

  userid = 0;

  //url = environment.imagens;

  temppm: any;

  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;
  t: number = 1;
  u: number = 1;
  v: number = 1;
  w: number = 1;
  x: number = 1;

  data$: any;

  graduacoes$: any;

  formcadsenha = new FormGroup({
    id: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
  });

  /*formcadpromo = new FormGroup({
    id: new FormControl(''),
    user_id: new FormControl(''),
    graduacao_id: new FormControl(''),
    tipo_id: new FormControl(''),
    data: new FormControl(''),
    boletim: new FormControl(''),

  });

  formcadferias = new FormGroup({
    id: new FormControl(''),
    user_id: new FormControl(''),
    data_ini: new FormControl(''),
    dias: new FormControl(''),
    boletim: new FormControl(''),
    ano: new FormControl(''),

  });*/

  constructor(private route: ActivatedRoute,
    //private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private usuarios: UsuariosService
    //private usuariospromocoes: UsuariosPromocoesService,
    //private usuariosferias: UsuariosFeriasService,
    //private graduacoes: GraduacoesService
    ) {

    this.user = this.session.getUser();    
    const routeParams = this.route.snapshot.paramMap;
    this.userid = Number(routeParams.get('id'));
    if(this.user.perfil.usuarios || this.userid == this.user.id){
      this.usuarios.show(this.userid).subscribe(data => {
        this.data$ = data;
  
        if(this.data$.data_ingresso){
          this.temppm = this.diff_year_month_day();
        }
        
        //this.temppm = new Date().getTime() - new Date(this.data$.data_ingresso).getTime();
        //this.temppm = new Date(this.temppm)
        
      });
    }else{
      this.router.navigate(['/Inicio']);
    }
  }

  ngOnInit(): void {
    /*this.graduacoes.index().subscribe(data => {
      this.graduacoes$ = data;
    });*/
  }

  refresh(){
    this.usuarios.show(this.data$.id).subscribe(data => {
      this.data$ = data;

      if(this.data$.data_ingresso){
        this.temppm = this.diff_year_month_day();
      }
      
      //this.temppm = new Date().getTime() - new Date(this.data$.data_ingresso).getTime();
      //this.temppm = new Date(this.temppm)
    });
  }

  diff_year_month_day() { 
    var date2 = new Date(this.data$.data_ingresso);
    var time = (new Date().getTime() - date2.getTime()) / 1000; 
    //var year = Math.abs(Math.round((time / (60 * 60 * 24)) / 365.25)); 
    //var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4))); 
    var days = Math.abs(Math.round(time / (3600 * 24))); 
    var anos = days / 365;
    var resto = days % 365;
    var meses = resto / 30;
    var dias = resto % 30;

    return Math.trunc(anos)+' anos, '+Math.trunc(meses)+' meses e '+dias+' dias';
  }

  
    
  /*
  salvarferias(){
    this.formcadferias.controls.user_id.patchValue(this.data$.id);
    this.usuariosferias.store(this.formcadferias.value).subscribe(data => {
      if(data == 1){
        this.toastr.success('Informação cadastrada com sucesso!');  
        this.formcadferias.reset();

        this.refresh();
      }
    });
  }

  deletferias(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir a férias de "+data.ano+"?");

    if(isExecuted){
      this.usuariosferias.destroy(data.id).subscribe(data => {
        if(data == 1){
          this.refresh();             
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }    
  }

  salvarpromo(){
    this.formcadpromo.controls.user_id.patchValue(this.data$.id);
    this.usuariospromocoes.store(this.formcadpromo.value).subscribe(data => {
      if(data == 1){
        this.toastr.success('Informação cadastrada com sucesso!');  
        this.formcadpromo.reset();

        this.refresh();
      }
    });
  }

  deletpromo(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir a promoção a "+data.nome+"?");

    if(isExecuted){
      this.usuariospromocoes.destroy(data.id).subscribe(data => {
        if(data == 1){
          this.refresh();             
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }    
  }*/

}
