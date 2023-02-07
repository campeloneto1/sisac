import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaisTiposService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/materiais-tipos`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/materiais-tipos/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/materiais-tipos`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/materiais-tipos/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/materiais-tipos/${id}`);
  }
}
