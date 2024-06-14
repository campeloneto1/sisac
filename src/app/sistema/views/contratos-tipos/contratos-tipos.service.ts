import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ContratoTipo, ContratosTipos } from "./contrato-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'contratos-tipos';

@Injectable({
    providedIn: 'root'
})
export class ContratosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ContratosTipos>{
        return this.http.get<ContratosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ContratoTipo>{
        return this.http.get<ContratoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ContratoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ContratoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}