import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PoliciaisHistoricos, PolicialHistorico } from "./policial-historico";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-historico';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisHistoricoService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(params: any): Observable<PoliciaisHistoricos>{
        return this.http.get<PoliciaisHistoricos>(`${URL}/${endPoint}`);
    }

    wherePol(id: number): Observable<PoliciaisHistoricos>{
        return this.http.get<PoliciaisHistoricos>(`${URL}/${endPoint}/${id}/policial`);
    }

    find(id: number): Observable<PolicialHistorico>{
        return this.http.get<PolicialHistorico>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialHistorico){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialHistorico){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}