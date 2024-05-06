import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { Policiais } from "../../policiais/policial";

const URL = environment.url;
const endPoint = 'policiais';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<Policiais>{
       return this.http.post<Policiais>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}