import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { PoliciaisRequeridas } from "../../policiais-requeridas/policial-requerida";

const URL = environment.url;
const endPoint = 'policiais-requeridas';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisRequeridasRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<PoliciaisRequeridas>{
       return this.http.post<PoliciaisRequeridas>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}