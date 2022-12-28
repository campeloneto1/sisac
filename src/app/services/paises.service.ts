import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/paises");
  }

  show(id:number){
    return this.http.get("/api/paises/"+id);
  }

  store(data:any){
    return this.http.post("/api/paises",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/paises/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/paises/"+id);
  }
}
