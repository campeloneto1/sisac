import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/marcas");
  }

  show(id:number){
    return this.http.get("/api/marcas/"+id);
  }

  where(id:number){
    return this.http.get("/api/marcas/"+id+"/where");
  }

  store(data:any){
    return this.http.post("/api/marcas",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/marcas/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/marcas/"+id);
  }
}
