import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalasUsersService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/escalas-users");
  }

  show(id:number){
    return this.http.get("/api/escalas-users/"+id);
  }

  falta(data:any){
    return this.http.post("/api/escalas-users-falta",data);
  }

  store(data:any){
    return this.http.post("/api/escalas-users",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/escalas-users/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/escalas-users/"+id);
  }
}
