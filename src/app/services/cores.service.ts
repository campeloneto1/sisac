import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoresService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/cores`);
  }

  where(id:number){
    return this.http.get(`${environment.url}/api/cores/${id}/where`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/cores/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/cores`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/cores/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/cores/${id}`);
  }
}
