import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/postos");
  }

  show(id:number){
    return this.http.get("/api/postos/"+id);
  }

  store(data:any){
    return this.http.post("/api/postos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/postos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/postos/"+id);
  }
}
