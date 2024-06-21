import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { VeiculoOficina, VeiculosOficinas } from "./veiculo-oficina";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'veiculos-oficinas';

@Injectable({
    providedIn: 'root'
})
export class VeiculosOficinasService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<VeiculosOficinas>{
        return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}`);
        //return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<VeiculoOficina>{
        return this.http.get<VeiculoOficina>(`${URL}/${endPoint}/${id}`);
    }

    create(data: VeiculoOficina){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: VeiculoOficina){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    emmanutencao(): Observable<VeiculosOficinas>{
        return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/emmanutencao`);
        //return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/emmanutencao?subunidade=${this.sessionService.getSubunidade()}`);
    }
   
    receber(data: any){
        return this.http.post(`${URL}/${endPoint}/receber`, data);
     }
}