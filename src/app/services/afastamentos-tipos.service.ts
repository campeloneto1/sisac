import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AfastamentosTiposService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"afastamentos-tipos");
  }

  show(id:number){
    return this.http.get(environment.url+"afastamentos-tipos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"afastamentos-tipos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"afastamentos-tipos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"afastamentos-tipos/"+id);
  }
}
