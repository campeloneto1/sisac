import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Perfil, Perfis } from "./perfil";
import { Observable } from "rxjs";

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class PerfisService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Perfis>{
        return this.http.get<Perfis>(`${URL}/perfis`);
    }

    find(id: number): Observable<Perfil>{
        return this.http.get<Perfil>(`${URL}/perfis/${id}`);
    }

    create(data: Perfil){
       return this.http.post(`${URL}/perfis`, data);
    }

    update(id:number, data: Perfil){
        return this.http.put(`${URL}/perfis/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/perfis/${id}`);
    }
   
}