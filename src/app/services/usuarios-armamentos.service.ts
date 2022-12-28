import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosArmamentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/usuarios-armamentos");
  }

  show(id:number){
    return this.http.get("/api/usuarios-armamentos/"+id);
  }

  receber(data:any){
    return this.http.post("/api/usuarios-armamentos-receber", data);
  }

  store(data:any){
    return this.http.post("/api/usuarios-armamentos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/usuarios-armamentos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/usuarios-armamentos/"+id);
  }
}
