import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"emprestimos");
  }

  where(id:number){
    return this.http.get(environment.url+"emprestimos/"+id+"/where");
  }

  receber(data:any){
    return this.http.post(environment.url+"emprestimos-receber", data);
  }

  show(id:number){
    return this.http.get(environment.url+"emprestimos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"emprestimos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"emprestimos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"emprestimos/"+id);
  }
}
