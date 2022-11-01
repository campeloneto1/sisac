import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrimoniosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"patrimonios");
  }

  show(id:number){
    return this.http.get(environment.url+"patrimonios/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"patrimonios",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"patrimonios/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"patrimonios/"+id);
  }
}
