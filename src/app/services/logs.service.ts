import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"logs");
  }

  show(id:number){
    return this.http.get(environment.url+"logs/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"logs",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"logs/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"logs/"+id);
  }
}
