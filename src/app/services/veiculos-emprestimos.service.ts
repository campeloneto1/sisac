import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosEmprestimosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/veiculos-emprestimos");
  }

  where(id:number){
    return this.http.get("/api/veiculos-emprestimos/"+id+"/where");
  }

  receber(data:any){
    return this.http.post("/api/veiculos-emprestimos-receber", data);
  }

  show(id:number){
    return this.http.get("/api/veiculos-emprestimos/"+id);
  }

  store(data:any){
    return this.http.post("/api/veiculos-emprestimos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/veiculos-emprestimos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/veiculos-emprestimos/"+id);
  }
}
