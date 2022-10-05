import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministracaoService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"administracao");
  }

  show(id:number){
    return this.http.get(environment.url+"administracao/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"administracao",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"administracao/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"administracao/"+id);
  }
}
