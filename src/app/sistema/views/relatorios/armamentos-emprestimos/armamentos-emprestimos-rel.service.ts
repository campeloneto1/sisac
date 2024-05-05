import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { ArmamentosEmprestimos } from "../../armamentos-emprestimos/armamento-emprestimo";

const URL = environment.url;
const endPoint = 'armamentos-emprestimos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosEmprestimosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<ArmamentosEmprestimos>{
       return this.http.post<ArmamentosEmprestimos>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}