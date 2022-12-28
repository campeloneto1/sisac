import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostosTurnosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/postos-turnos");
  }

  show(id:number){
    return this.http.get("/api/postos-turnos/"+id);
  }

  store(data:any){
    return this.http.post("/api/postos-turnos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/postos-turnos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/postos-turnos/"+id);
  }
}
