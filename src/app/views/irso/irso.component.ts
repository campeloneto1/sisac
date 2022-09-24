import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IrsosService } from '../../services/irsos.service';
import { SessionService } from '../../services/session.service';

import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-irso',
  templateUrl: './irso.component.html',
  styleUrls: ['./irso.component.css']
})
export class IrsoComponent implements OnInit {

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
    private irsos: IrsosService,
    private session: SessionService,
    private apcom: AppComponent
  ) {
    
    setTimeout( () => {
      this.user = this.session.getUser();
      if(this.user.perfil.irsos){
        this.apcom.token = false;
      }else{
        this.router.navigate(['/Inicio']);
      }
    }, 1000);
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.irsos.show(userid).subscribe((data) => {
      this.data$ = data;      
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    setTimeout( () => {
      this.user = this.session.getUser();
      //console.log(this.user);
    }, 1000);

    
   
  }
}
