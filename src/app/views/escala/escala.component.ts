import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EscalasService } from '../../services/escalas.service';
import { EscalasModelosService } from '../../services/escalas-modelos.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.css']
})
export class EscalaComponent implements OnInit {

  data$: any;
  modalidades$: any;

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
    private route: ActivatedRoute,
    private escalas: EscalasService,
    private escalasmodelos: EscalasModelosService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.escalas.show(userid).subscribe((data) => {
      this.data$ = data;
      //@ts-ignore
      var date2 = new Date(data.data);
      //@ts-ignore
      this.dataesc = date2.getDate()+' de '+this.month[date2.getMonth()]+' de '+date2.getFullYear()+' ('+this.diasemana[date2.getDay()]+')';
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    setTimeout( () => {
      this.user = this.session.getUser();
      //console.log(this.user);
    }, 1000);
  }

}
