import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosEmprestimosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"veiculos-emprestimos");
  }

  where(id:number){
    return this.http.get(environment.url+"veiculos-emprestimos/"+id+"/where");
  }

  receber(data:any){
    return this.http.post(environment.url+"veiculos-emprestimos-receber", data);
  }

  show(id:number){
    return this.http.get(environment.url+"veiculos-emprestimos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"veiculos-emprestimos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"veiculos-emprestimos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"veiculos-emprestimos/"+id);
  }
}
