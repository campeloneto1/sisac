import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalasModelosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"escalas-modelos");
  }

  show(id:number){
    return this.http.get(environment.url+"escalas-modelos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"escalas-modelos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"escalas-modelos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"escalas-modelos/"+id);
  }
}
