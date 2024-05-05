import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { Patrimonios } from "../../patrimonios/patrimonio";

const URL = environment.url;
const endPoint = 'patrimonios';

@Injectable({
    providedIn: 'root'
})
export class PatrimoniosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<Patrimonios>{
       return this.http.post<Patrimonios>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}