import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraduacoesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/graduacoes");
  }

  show(id:number){
    return this.http.get("/api/graduacoes/"+id);
  }

  store(data:any){
    return this.http.post("/api/graduacoes",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/graduacoes/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/graduacoes/"+id);
  }
}
