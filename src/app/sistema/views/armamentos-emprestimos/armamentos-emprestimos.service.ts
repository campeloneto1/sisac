import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ArmamentoEmprestimo, ArmamentosEmprestimos } from "./armamento-emprestimo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'armamentos-emprestimos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosEmprestimosService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService
    ){}

    index(): Observable<ArmamentosEmprestimos>{
        return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}`);
       //return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
        
    }

    find(id: number): Observable<ArmamentoEmprestimo>{
        return this.http.get<ArmamentoEmprestimo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ArmamentoEmprestimo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ArmamentoEmprestimo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    receber(data:any){
        return this.http.post(`${URL}/${endPoint}/receber`, data);
    }
   
}