import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { ValidacaoService } from '../../services/validacao.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-validacao',
  templateUrl: './validacao.component.html',
  styleUrls: ['./validacao.component.css']
})
export class ValidacaoComponent implements OnInit {

  data$: any;
  tipo: any;
  url = environment.imagens;
  subunidade: any;
  date = new Date();
  notfound = false;
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
    private validacao: ValidacaoService,
    private subunidades: SubunidadesService,
    private apcom: AppComponent
  ) {
    this.apcom.token = false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const key = routeParams.get('id');

    var keys = key?.split('$');
    //console.log(keys);
    //@ts-ignore
    this.tipo = keys[0];
    //@ts-ignore
    switch (keys[0]) {
      case '1':
        //@ts-ignore
        this.validacao.validardocumento(keys[1]).subscribe(data => {
          //@ts-ignore
          if(data[0]){
             //@ts-ignore
            this.data$ = data[0];
            this.notfound = false;
          }else{
            this.notfound = true;
          }
         
        });
        break;
      case '2':
        //@ts-ignore
        this.validacao.validararmamento(keys[1]).subscribe(data => {
           //@ts-ignore
          if(data[0]){
            //@ts-ignore
           this.data$ = data[0];
           this.notfound = false;
         }else{
           this.notfound = true;
         }
        });
        break;
      case '3':
        //@ts-ignore
        this.validacao.validarmaterial(keys[1]).subscribe(data => {
           //@ts-ignore
          if(data[0]){
            //@ts-ignore
           this.data$ = data[0];
           this.notfound = false;
         }else{
           this.notfound = true;
         }
        });
        break;
      case '4':
        //@ts-ignore
        this.validacao.validarocorrencia(keys[1]).subscribe(data => {
           //@ts-ignore
          if(data[0]){
            //@ts-ignore
           this.data$ = data[0];
           this.notfound = false;
         }else{
           this.notfound = true;
         }
        });
        break; 
      case '5':
        //@ts-ignore
        this.validacao.validarveiculo(keys[1]).subscribe(data => {
           //@ts-ignore
          if(data[0]){
            //@ts-ignore
           this.data$ = data[0];
           this.notfound = false;
         }else{
           this.notfound = true;
         }
        });
        break;  
      case '6':
          //@ts-ignore
          this.validacao.validarferias(keys[1]).subscribe(data => {
             //@ts-ignore
            if(data[0]){
              //@ts-ignore
             this.data$ = data[0];
             this.notfound = false;
           }else{
             this.notfound = true;
           }
          });
          break;         
      default:
        break;
    }

    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();
   
  }
}
