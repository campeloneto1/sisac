import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"usuarios");
  }

  show(id:number){
    return this.http.get(environment.url+"usuarios/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"usuarios",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"usuarios/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"usuarios/"+id);
  }
  
}
