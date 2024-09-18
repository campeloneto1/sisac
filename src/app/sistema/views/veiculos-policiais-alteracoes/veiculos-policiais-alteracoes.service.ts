import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { VeiculoPolicialAlteracao, VeiculosPoliciaisAlteracoes } from "./veiculo-policial-alteracao";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'veiculos-policiais-alteracoes';

@Injectable({
    providedIn: 'root'
})
export class VeiculosPoliciaisAlteracoesService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<VeiculosPoliciaisAlteracoes>{
        return this.http.get<VeiculosPoliciaisAlteracoes>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<VeiculoPolicialAlteracao>{
        return this.http.get<VeiculoPolicialAlteracao>(`${URL}/${endPoint}/${id}`);
    }

    create(data: VeiculoPolicialAlteracao){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: VeiculoPolicialAlteracao){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    
}