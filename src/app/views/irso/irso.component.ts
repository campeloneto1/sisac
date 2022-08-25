import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IrsosService } from '../../services/irsos.service';
import { SessionService } from '../../services/session.service';

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
    private irsos: IrsosService,
    private session: SessionService
  ) {}

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
