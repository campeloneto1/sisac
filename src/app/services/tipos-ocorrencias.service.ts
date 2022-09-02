import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TiposOcorrenciasService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"ocorrencias");
  }

  show(id:number){
    return this.http.get(environment.url+"ocorrencias/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"ocorrencias",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"ocorrencias/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"ocorrencias/"+id);
  }
}
