import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ArmamentoTipo, ArmamentosTipos } from "./armamento-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'armamentos-tipos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ArmamentosTipos>{
        return this.http.get<ArmamentosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ArmamentoTipo>{
        return this.http.get<ArmamentoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ArmamentoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ArmamentoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}