import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/materiais");
  }

  index2(){
    return this.http.get("/api/materiais2");
  }

  reparar(id:number){
    return this.http.get("/api/materiais-reparar/"+id);
  }

  show(id:number){
    return this.http.get("/api/materiais/"+id);
  }

  store(data:any){
    return this.http.post("/api/materiais",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/materiais/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/materiais/"+id);
  }
}
