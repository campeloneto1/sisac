import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Contrato, Contratos } from "./contrato";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'contratos';

@Injectable({
    providedIn: 'root'
})
export class ContratosService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<Contratos>{
        return this.http.get<Contratos>(`${URL}/${endPoint}`);
        //return this.http.get<Contratos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<Contrato>{
        return this.http.get<Contrato>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Contrato){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Contrato){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
    aditivar(id:number, data: any){
        return this.http.put(`${URL}/${endPoint}/${id}/aditivar`, data);
    }
}