import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosPromocoesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/usuarios-promocoes");
  }

  show(id:number){
    return this.http.get("/api/usuarios-promocoes/"+id);
  }

  store(data:any){
    return this.http.post("/api/usuarios-promocoes",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/usuarios-promocoes/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/usuarios-promocoes/"+id);
  }
}
