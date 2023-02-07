import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/cidades`);
  }

  where(id:number){
    return this.http.get(`${environment.url}/api/cidades/${id}/where`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/cidades/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/cidades`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/cidades/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/cidades/${id}`);
  }
}
