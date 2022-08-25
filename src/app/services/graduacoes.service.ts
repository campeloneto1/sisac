import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraduacoesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"graduacoes");
  }

  show(id:number){
    return this.http.get(environment.url+"graduacoes/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"graduacoes",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"graduacoes/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"graduacoes/"+id);
  }
}
