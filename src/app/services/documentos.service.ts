import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/documentos");
  }

  show(id:number){
    return this.http.get("/api/documentos/"+id);
  }

  store(data:any){
    return this.http.post("/api/documentos",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/documentos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/documentos/"+id);
  }
}
