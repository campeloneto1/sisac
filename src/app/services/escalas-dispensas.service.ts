import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalasDispensasService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/escalas-dispensas");
  }

  show(id:number){
    return this.http.get("/api/escalas-dispensas/"+id);
  }

  store(data:any){
    return this.http.post("/api/escalas-dispensas",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/escalas-dispensas/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/escalas-dispensas/"+id);
  }
}
