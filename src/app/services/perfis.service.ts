import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfisService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/perfis`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/perfis/${id}`);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/perfis`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/perfis/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/perfis/${id}`);
  }
}
