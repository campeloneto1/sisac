import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/materiais`);
  }

  index2(){
    return this.http.get(`${environment.url}/api/materiais2`);
  }

  reparar(id:number){
    return this.http.get(`${environment.url}/api/materiais-reparar/${id}`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/materiais/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/materiais`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/materiais/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/materiais/${id}`);
  }
}
