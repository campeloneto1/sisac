import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { AfastamentoTipo, AfastamentosTipos } from "./afastamento-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'afastamentos-tipos';

@Injectable({
    providedIn: 'root'
})
export class AfastamentosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<AfastamentosTipos>{
        return this.http.get<AfastamentosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<AfastamentoTipo>{
        return this.http.get<AfastamentoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: AfastamentoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: AfastamentoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}