import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAfastamentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"usuarios-afastamentos");
  }

  show(id:number){
    return this.http.get(environment.url+"usuarios-afastamentos/"+id);
  }

  ativos(){
    return this.http.get(environment.url+"usuarios-afastamentos-ativos");
  }

  store(data:any){
    return this.http.post(environment.url+"usuarios-afastamentos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"usuarios-afastamentos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"usuarios-afastamentos/"+id);
  }
}
