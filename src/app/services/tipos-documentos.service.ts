import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposDocumentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/documentos-tipos");
  }

  show(id:number){
    return this.http.get("/api/documentos-tipos/"+id);
  }

  store(data:any){
    return this.http.post("/api/documentos-tipos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/documentos-tipos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/documentos-tipos/"+id);
  }
}
