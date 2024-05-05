import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { Armamentos } from "../../armamentos/armamento";

const URL = environment.url;
const endPoint = 'armamentos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<Armamentos>{
       return this.http.post<Armamentos>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}