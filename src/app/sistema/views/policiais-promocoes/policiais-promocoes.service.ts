import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PoliciaisPromocoes, PolicialPromocao } from "./policial-promocao";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-promocoes';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisPromocoesService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(params:any): Observable<PoliciaisPromocoes>{
        if(params){
            let queryParams:Array<string> = [];
            if (params.ativo) {
                queryParams.push(`ativo=${params.ativo}`);
            }
            return this.http.get<PoliciaisPromocoes>(`${URL}/${endPoint}?${queryParams.join("&")}`);
        }
        return this.http.get<PoliciaisPromocoes>(`${URL}/${endPoint}`);
        //return this.http.get<PoliciaisCursos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<PolicialPromocao>{
        return this.http.get<PolicialPromocao>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialPromocao){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialPromocao){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    wherePol(id: number): Observable<PoliciaisPromocoes>{
        return this.http.get<PoliciaisPromocoes>(`${URL}/${endPoint}/${id}/wherepol`);
    }
   
}