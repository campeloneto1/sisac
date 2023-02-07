import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/documentos`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/documentos/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/documentos`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/documentos/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/documentos/${id}`);
  }
}
