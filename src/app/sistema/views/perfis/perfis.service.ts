import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Perfil, Perfis } from "./perfil";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'perfis';

@Injectable({
    providedIn: 'root'
})
export class PerfisService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Perfis>{
        return this.http.get<Perfis>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Perfil>{
        return this.http.get<Perfil>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Perfil){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Perfil){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}