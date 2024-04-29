import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PatrimonioTipo, PatrimoniosTipos } from "./patrimonio-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'patrimonios-tipos';

@Injectable({
    providedIn: 'root'
})
export class PatrimoniosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<PatrimoniosTipos>{
        return this.http.get<PatrimoniosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<PatrimonioTipo>{
        return this.http.get<PatrimonioTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PatrimonioTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PatrimonioTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}