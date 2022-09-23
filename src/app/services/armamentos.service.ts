import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArmamentosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"armamentos");
  }

  show(id:number){
    return this.http.get(environment.url+"armamentos/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"armamentos",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"armamentos/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"armamentos/"+id);
  }
}
