import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IrsosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/irsos`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/irsos/${id}`);
  }

  where(data:any){
    return this.http.post(`${environment.url}/api/irsos-where`,data);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/irsos`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/irsos/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/irsos/${id}`);
  }
}
