import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFeriasService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/usuarios-ferias`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/usuarios-ferias/${id}`);
  }

  ativos(){
    return this.http.get(`${environment.url}/api/usuarios-ferias-ativos`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/usuarios-ferias`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/usuarios-ferias/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/usuarios-ferias/${id}`);
  }
}
