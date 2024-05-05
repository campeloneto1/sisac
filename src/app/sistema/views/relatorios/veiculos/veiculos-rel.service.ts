import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { Veiculos } from "../../veiculos/veiculo";

const URL = environment.url;
const endPoint = 'veiculos';

@Injectable({
    providedIn: 'root'
})
export class VeiculosRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<Veiculos>{
       return this.http.post<Veiculos>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}