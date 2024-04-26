import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ManutencaoTipo, ManutencoesTipos } from "./manutencao-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'manutencoes-tipos';

@Injectable({
    providedIn: 'root'
})
export class ManutencoesTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ManutencoesTipos>{
        return this.http.get<ManutencoesTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ManutencaoTipo>{
        return this.http.get<ManutencaoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ManutencaoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ManutencaoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}