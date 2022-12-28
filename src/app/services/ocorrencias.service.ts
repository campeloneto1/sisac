import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciasService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/escalas-ocorrencias");
  }

  show(id:number){
    return this.http.get("/api/escalas-ocorrencias/"+id);
  }

  store(data:any){
    return this.http.post("/api/escalas-ocorrencias",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/escalas-ocorrencias/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/escalas-ocorrencias/"+id);
  }
}
