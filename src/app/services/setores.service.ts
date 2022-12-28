import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetoresService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/setores");
  }

  where(id:number){
    return this.http.get("/api/setores/"+id+"/where");
  }

  where2(id:number){
    return this.http.get("/api/setores/"+id+"/where2");
  }

  show(id:number){
    return this.http.get("/api/setores/"+id);
  }

  store(data:any){
    return this.http.post("/api/setores",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/setores/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/setores/"+id);
  }
}
