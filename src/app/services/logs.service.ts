import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/logs");
  }

  show(id:number){
    return this.http.get("/api/logs/"+id);
  }

  store(data:any){
    return this.http.post("/api/logs",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/logs/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/logs/"+id);
  }
}
