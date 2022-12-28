import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosPublicacoesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/usuarios-publicacoes");
  }

  show(id:number){
    return this.http.get("/api/usuarios-publicacoes/"+id);
  }

  store(data:any){
    return this.http.post("/api/usuarios-publicacoes",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/usuarios-publicacoes/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/usuarios-publicacoes/"+id);
  }
}
