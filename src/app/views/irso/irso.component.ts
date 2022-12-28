import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { IrsosService } from '../../services/irsos.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { SessionService } from '../../services/session.service';

import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-irso',
  templateUrl: './irso.component.html',
  styleUrls: ['./irso.component.css']
})
export class IrsoComponent implements OnInit {

  data$: any;
  url = environment.imagens;
  subunidade: any;

  user: any;
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
    private irsos: IrsosService,
    private subunidades: SubunidadesService,
    private session: SessionService,
    private apcom: AppComponent
  ) {
    //this.apcom.token = false;
      this.user = this.session.getUser();
      if(this.user.perfil.irsos){
        
      }else{
        this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));
    //@ts-ignore
    var ids = routeParams.params.id.split('-');
    ids.shift();
    //console.log(ids);


    this.irsos.where(ids).subscribe((data) => {
      this.data$ = data;     
      
      this.subunidades.show(this.data$[0].subunidade_id).subscribe((data) => {
        this.subunidade = data;      
      });
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    this.user = this.session.getUser();

  }
}
