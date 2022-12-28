import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalasModelosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/escalas-modelos");
  }

  show(id:number){
    return this.http.get("/api/escalas-modelos/"+id);
  }

  store(data:any){
    return this.http.post("/api/escalas-modelos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/escalas-modelos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/escalas-modelos/"+id);
  }
}
