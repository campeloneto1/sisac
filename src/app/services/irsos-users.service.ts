import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IrsosUsersService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/irsos-users");
  }

  show(id:number){
    return this.http.get("/api/irsos-users/"+id);
  }

  store(data:any){
    return this.http.post("/api/irsos-users",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/irsos-users/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/irsos-users/"+id);
  }
}
