import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ArmamentoEmprestimoItem, ArmamentosEmprestimosItens } from "./armamento-emprestimo-item";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'armamentos-emprestimos-itens';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosEmprestimosItensService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ArmamentosEmprestimosItens>{
        return this.http.get<ArmamentosEmprestimosItens>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ArmamentoEmprestimoItem>{
        return this.http.get<ArmamentoEmprestimoItem>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ArmamentoEmprestimoItem){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ArmamentoEmprestimoItem){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}