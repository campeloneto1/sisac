import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Banco, Bancos } from "./banco";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'bancos';

@Injectable({
    providedIn: 'root'
})
export class BancosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Bancos>{
        return this.http.get<Bancos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Banco>{
        return this.http.get<Banco>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Banco){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Banco){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}