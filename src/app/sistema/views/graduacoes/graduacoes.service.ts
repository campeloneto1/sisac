import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Graduacao, Graduacoes } from "./graduacao";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'graduacoes';

@Injectable({
    providedIn: 'root'
})
export class GraduacoesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Graduacoes>{
        return this.http.get<Graduacoes>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Graduacao>{
        return this.http.get<Graduacao>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Graduacao){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Graduacao){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}