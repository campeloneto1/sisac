import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IrsosFinanceirosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/irsos-financeiros`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/irsos-financeiros/${id}`);
  }

  gastomensal(data:any){
    return this.http.get(`${environment.url}/api/irsos-financeiros/${data}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/irsos-financeiros`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/irsos-financeiros/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/irsos-financeiros/${id}`);
  }
}
