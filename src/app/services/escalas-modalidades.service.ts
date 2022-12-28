import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalasModalidadesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/escalas-modalidades");
  }

  show(id:number){
    return this.http.get("/api/escalas-modalidades/"+id);
  }

  store(data:any){
    return this.http.post("/api/escalas-modalidades",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/escalas-modalidades/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/escalas-modalidades/"+id);
  }
}
