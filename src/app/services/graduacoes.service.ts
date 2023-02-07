import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraduacoesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/graduacoes`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/graduacoes/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/graduacoes`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/graduacoes/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/graduacoes/${id}`);
  }
}
