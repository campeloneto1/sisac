import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { PoliciaisFerias } from "../../policiais-ferias/policial-ferias";

const URL = environment.url;
const endPoint = 'policiais-ferias';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisFeriasRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<PoliciaisFerias>{
       return this.http.post<PoliciaisFerias>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}