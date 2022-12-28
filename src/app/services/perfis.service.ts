import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfisService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/perfis");
  }

  show(id:number){
    return this.http.get("/api/perfis/"+id);
  }

  store(data:any){
    return this.http.post("/api/perfis",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/perfis/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/perfis/"+id);
  }
}
