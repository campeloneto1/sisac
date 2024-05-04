import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { VeiculosPoliciais } from "../../veiculos-policiais/veiculo-policial";

const URL = environment.url;
const endPoint = 'veiculos-policiais';

@Injectable({
    providedIn: 'root'
})
export class VeiculosPoliciaisRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<VeiculosPoliciais>{
       return this.http.post<VeiculosPoliciais>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}