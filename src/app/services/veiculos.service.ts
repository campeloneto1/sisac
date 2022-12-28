import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/veiculos");
  }

  index2(){
    return this.http.get("/api/veiculos2");
  }

  show(id:number){
    return this.http.get("/api/veiculos/"+id);
  }

  store(data:any){
    return this.http.post("/api/veiculos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/veiculos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/veiculos/"+id);
  }

  trocaoleo(data:any){
    return this.http.post("/api/veiculos-trocaoleo", data);
  }
}
