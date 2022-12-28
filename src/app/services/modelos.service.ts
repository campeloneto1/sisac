import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/modelos");
  }

  show(id:number){
    return this.http.get("/api/modelos/"+id);
  }

  where(id:number){
    return this.http.get("/api/modelos/"+id+"/where");
  }

  store(data:any){
    return this.http.post("/api/modelos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/modelos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/modelos/"+id);
  }
}
