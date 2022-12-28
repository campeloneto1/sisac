import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/usuarios");
  }

  index2(){
    return this.http.get("/api/usuarios2");
  }

  show(id:number){
    return this.http.get("/api/usuarios/"+id);
  }

  changepass(data:any){
    return this.http.post("/api/usuarios-changepass",data);
  }

  resetpass(id:number){
    return this.http.get("/api/usuarios-resetpass/"+id);
  }

  store(data:any){
    return this.http.post("/api/usuarios",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/usuarios/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/usuarios/"+id);
  }
  
}
