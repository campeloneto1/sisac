import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoresService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/cores");
  }

  where(id:number){
    return this.http.get("/api/cores/"+id+"/where");
  }

  show(id:number){
    return this.http.get("/api/cores/"+id);
  }

  store(data:any){
    return this.http.post("/api/cores",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/cores/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/cores/"+id);
  }
}
