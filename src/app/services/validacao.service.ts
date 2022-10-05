import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  constructor(private http: HttpClient) {}

  validardocumento(data:any){
    return this.http.get(environment.url+"validar-documento/"+data);
  }

  validararmamento(data:any){
    return this.http.get(environment.url+"validar-emparmamento/"+data);
  }

  validarmaterial(data:any){
    return this.http.get(environment.url+"validar-empmaterial/"+data);
  }

  validarveiculo(data:any){
    return this.http.get(environment.url+"validar-empveiculo/"+data);
  }

  validarocorrencia(data:any){
    return this.http.get(environment.url+"validar-ocorrencia/"+data);
  }

  validarferias(data:any){
    return this.http.get(environment.url+"validar-ferias/"+data);
  }
}
