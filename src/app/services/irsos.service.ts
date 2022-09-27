import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IrsosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"irsos");
  }

  show(id:number){
    return this.http.get(environment.url+"irsos/"+id);
  }

  where(data:any){
    return this.http.post(environment.url+"irsos-where",data);
  }

  store(data:any){
    return this.http.post(environment.url+"irsos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"irsos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"irsos/"+id);
  }
}
