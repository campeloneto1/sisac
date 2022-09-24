import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OcorrenciasService } from '../../services/ocorrencias.service';
import { SessionService } from '../../services/session.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-ocorrencia',
  templateUrl: './ocorrencia.component.html',
  styleUrls: ['./ocorrencia.component.css']
})
export class OcorrenciaComponent implements OnInit {

  data$: any;

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
    private ocorrencias: OcorrenciasService,
    private session: SessionService,
    private apcom: AppComponent
  ) {
    setTimeout( () => {
      this.user = this.session.getUser();
      if(this.user.perfil.oficial_dia){
        this.apcom.token = false;
      }else{
        this.router.navigate(['/Inicio']);
      }
    }, 1000);
    
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    

    
    this.ocorrencias.show(userid).subscribe((data) => {
      this.data$ = data;
      //@ts-ignore
      var date2 = new Date(data.created_at);
      //@ts-ignore
      //console.log(date2.getDate())
      //@ts-ignore
      this.datadoc = date2.getDate()+' de '+this.month[date2.getMonth()]+' de '+date2.getFullYear();
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    setTimeout( () => {
      this.user = this.session.getUser();
      //console.log(this.user);
    }, 1000);
  }

}
