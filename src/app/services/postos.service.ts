import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"postos");
  }

  show(id:number){
    return this.http.get(environment.url+"postos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"postos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"postos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"postos/"+id);
  }
}
