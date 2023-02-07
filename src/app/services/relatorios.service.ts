import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) {}

  getEmpArmamentos(data: any){
    return this.http.post(`${environment.url}/api/relatorios-emparmamentos`, data);
  }

  getEmpMateriais(data: any){
    return this.http.post(`${environment.url}/api/relatorios-empmateriais`, data);
  }

  getEmpVeiculos(data: any){
    return this.http.post(`${environment.url}/api/relatorios-empveiculos`, data);
  }

  getPromocoes(data: any){
    return this.http.post(`${environment.url}/api/relatorios-promocoes`, data);
  }


  
}
