import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(environment.url+"materiais");
  }

  show(id:number){
    return this.http.get(environment.url+"materiais/"+id);
  }

  store(data:any){
    return this.http.post(environment.url+"materiais",data);
  }

  update(data:any,id:number){
    return this.http.put(environment.url+"materiais/"+id,data);
  }

  destroy(id:number){
    return this.http.delete(environment.url+"materiais/"+id);
  }
}
