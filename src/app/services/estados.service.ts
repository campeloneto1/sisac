import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/estados`);
  }

  where(id:number){
    return this.http.get(`${environment.url}/api/estados/${id}/where`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/estados/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/estados`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/estados/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/estados/${id}`);
  }
}
