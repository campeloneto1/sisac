import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubunidadesService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/subunidades`);
  }

  where(id:number){
    return this.http.get(`${environment.url}/api/subunidades/${id}/where`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/subunidades/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/subunidades`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/subunidades/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/subunidades/${id}`);
  }
}
