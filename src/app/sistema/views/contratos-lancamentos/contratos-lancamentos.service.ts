import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ContratoLancamento,ContratosLancamentos } from "./contrato-lancamento";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'contratos-lancamentos';

@Injectable({
    providedIn: 'root'
})
export class ContratosLancamentosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ContratosLancamentos>{
        return this.http.get<ContratosLancamentos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ContratoLancamento>{
        return this.http.get<ContratoLancamento>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ContratoLancamento){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ContratoLancamento){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}