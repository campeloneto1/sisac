import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { UsuariosArmamentosService } from '../../services/usuarios-armamentos.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { SessionService } from '../../services/session.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-armamento',
  templateUrl: './armamento.component.html',
  styleUrls: ['./armamento.component.css']
})
export class ArmamentoComponent implements OnInit {

  data$: any;
  url = environment.imagens;
  qrcod = '';
  user: any;
  subunidade: any;
  date = new Date();
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private armamentos: UsuariosArmamentosService,
    private session: SessionService,
    private subunidades: SubunidadesService,
    private apcom: AppComponent
  ) {
    
      this.apcom.token = false;
      this.user = this.session.getUser();
      if(this.user.perfil.armamentos){
       
      }else{
        this.router.navigate(['/']);
      }
   
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.armamentos.show(userid).subscribe((data) => {
      this.data$ = data;

      this.subunidades.show(this.data$.subunidade_id).subscribe(data => {
        this.subunidade = data;
      });

      this.qrcod = environment.ipserver+'Validacao/2$'+this.data$.key;
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    
    
    this.user = this.session.getUser();
      //console.log(this.user);
   
  }

}
