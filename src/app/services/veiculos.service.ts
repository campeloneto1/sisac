import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"veiculos");
  }

  index2(){
    return this.http.get(environment.url+"veiculos2");
  }

  show(id:number){
    return this.http.get(environment.url+"veiculos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"veiculos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"veiculos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"veiculos/"+id);
  }

  trocaoleo(data:any){
    return this.http.post(environment.url+"veiculos-trocaoleo", data);
  }
}
