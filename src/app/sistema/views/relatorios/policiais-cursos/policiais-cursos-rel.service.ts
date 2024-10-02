import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { PoliciaisCursos } from "../../policiais-cursos/policial-curso";

const URL = environment.url;
const endPoint = 'policiais-cursos';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisCursosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<PoliciaisCursos>{
       return this.http.post<PoliciaisCursos>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}