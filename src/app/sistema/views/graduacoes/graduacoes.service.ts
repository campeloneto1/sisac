import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Graduacao, Graduacoes } from "./graduacao";
import { Observable } from "rxjs";

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class GraduacoesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Graduacoes>{
        return this.http.get<Graduacoes>(`${URL}/graduacoes`);
    }

    find(id: number): Observable<Graduacao>{
        return this.http.get<Graduacao>(`${URL}/graduacoes/${id}`);
    }

    create(data: Graduacao){
       return this.http.post(`${URL}/graduacoes`, data);
    }

    update(id:number, data: Graduacao){
        return this.http.put(`${URL}/graduacoes/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/graduacoes/${id}`);
    }
   
}