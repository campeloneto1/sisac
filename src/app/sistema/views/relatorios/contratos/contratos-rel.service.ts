import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { Contratos } from "../../contratos/contrato";

const URL = environment.url;
const endPoint = 'contratos';

@Injectable({
    providedIn: 'root'
})
export class ContratosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<Contratos>{
       return this.http.post<Contratos>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}