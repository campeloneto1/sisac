import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrimoniosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get("/api/patrimonios");
  }

  show(id:number){
    return this.http.get("/api/patrimonios/"+id);
  }

  store(data:any){
    return this.http.post("/api/patrimonios",data);
  }

  update(data:any,id:number){
    return this.http.put("/api/patrimonios/"+id,data);
  }

  destroy(id:number){
    return this.http.delete("/api/patrimonios/"+id);
  }
}
