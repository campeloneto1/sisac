import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalasPostosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/escalas-postos");
  }

  show(id:number){
    return this.http.get("/api/escalas-postos/"+id);
  }

  store(data:any){
    return this.http.post("/api/escalas-postos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/escalas-postos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/escalas-postos/"+id);
  }
}
