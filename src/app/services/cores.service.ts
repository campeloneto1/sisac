import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoresService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"cores");
  }

  where(id:number){
    return this.http.get(environment.url+"cores/"+id+"/where");
  }

  show(id:number){
    return this.http.get(environment.url+"cores/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"cores",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"cores/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"cores/"+id);
  }
}
