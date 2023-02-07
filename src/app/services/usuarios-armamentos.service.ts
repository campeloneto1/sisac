import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosArmamentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/usuarios-armamentos`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/usuarios-armamentos/${id}`);
  }

  receber(data:any){
    return this.http.post(`${environment.url}/api/usuarios-armamentos-receber`, data);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/usuarios-armamentos`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/usuarios-armamentos/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/usuarios-armamentos/${id}`);
  }
}
