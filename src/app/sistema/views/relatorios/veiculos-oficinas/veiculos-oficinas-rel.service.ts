import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { VeiculoOficina, VeiculosOficinas } from "../../veiculos-oficinas/veiculo-oficina";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'veiculos-oficinas';

@Injectable({
    providedIn: 'root'
})
export class VeiculosOficinasRelService{

    constructor(
        private http: HttpClient,
    ){}
   
    relatorio(data: any):Observable<VeiculosOficinas>{
       return this.http.post<VeiculosOficinas>(`${URL}/${endPoint}/relatorio`, data);
    }
   
}