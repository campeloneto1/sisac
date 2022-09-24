import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"modelos");
  }

  show(id:number){
    return this.http.get(environment.url+"modelos/"+id);
  }

  where(id:number){
    return this.http.get(environment.url+"modelos/"+id+"/where");
  }

  store(data:any){
    return this.http.post(environment.url+"modelos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"modelos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"modelos/"+id);
  }
}
