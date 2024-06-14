import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ContratoObjeto, ContratosObjetos } from "./contrato-objeto";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'contratos-objetos';

@Injectable({
    providedIn: 'root'
})
export class ContratosObjetosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ContratosObjetos>{
        return this.http.get<ContratosObjetos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ContratoObjeto>{
        return this.http.get<ContratoObjeto>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ContratoObjeto){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ContratoObjeto){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}