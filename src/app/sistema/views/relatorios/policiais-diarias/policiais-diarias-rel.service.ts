import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { PoliciaisDiarias } from "../../policiais-diarias/policial-diaria";

const URL = environment.url;
const endPoint = 'policiais-diarias';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisDiariasRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<PoliciaisDiarias>{
       return this.http.post<PoliciaisDiarias>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}