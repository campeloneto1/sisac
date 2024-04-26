import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { VeiculoTipo, VeiculosTipos } from "./veiculo-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'veiculos-tipos';

@Injectable({
    providedIn: 'root'
})
export class VeiculosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<VeiculosTipos>{
        return this.http.get<VeiculosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<VeiculoTipo>{
        return this.http.get<VeiculoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: VeiculoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: VeiculoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}