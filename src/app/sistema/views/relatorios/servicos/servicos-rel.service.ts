import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { Servicos } from "../../servicos/servico";

const URL = environment.url;
const endPoint = 'servicos';

@Injectable({
    providedIn: 'root'
})
export class ServicosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<Servicos>{
       return this.http.post<Servicos>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}