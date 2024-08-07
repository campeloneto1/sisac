import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { PoliciaisAtestados } from "../../policiais-atestados/policial-atestado";

const URL = environment.url;
const endPoint = 'policiais-atestados';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisAtestadosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<PoliciaisAtestados>{
       return this.http.post<PoliciaisAtestados>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}