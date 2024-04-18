import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PublicacaoTipo, PublicacoesTipos } from "./publicacao-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'publicacoes-tipos';

@Injectable({
    providedIn: 'root'
})
export class PublicacoesTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<PublicacoesTipos>{
        return this.http.get<PublicacoesTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<PublicacaoTipo>{
        return this.http.get<PublicacaoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PublicacaoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PublicacaoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}