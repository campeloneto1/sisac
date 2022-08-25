import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"paises");
  }

  show(id:number){
    return this.http.get(environment.url+"paises/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"paises",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"paises/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"paises/"+id);
  }
}
