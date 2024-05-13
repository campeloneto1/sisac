import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisConsumoSaidas, MaterialConsumoSaida } from "./material-consumo-saida";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-consumo-saidas';

@Injectable({
    providedIn: 'root'
})
export class MateriaisConsumoSaidasService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisConsumoSaidas>{
        return this.http.get<MateriaisConsumoSaidas>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<MaterialConsumoSaida>{
        return this.http.get<MaterialConsumoSaida>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialConsumoSaida){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialConsumoSaida){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}