import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/marcas`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/marcas/${id}`);
  }

  where(id:number){
    return this.http.get(`${environment.url}/api/marcas/${id}/where`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/marcas`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/marcas/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/marcas/${id}`);
  }
}
