import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PoliciaisDiarias, PolicialDiaria } from "./policial-diaria";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-diarias';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisDiariasService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(params:any): Observable<PoliciaisDiarias>{
        if(params){
            let queryParams:Array<string> = [];
            if (params.ativo) {
                queryParams.push(`ativo=${params.ativo}`);
            }
            return this.http.get<PoliciaisDiarias>(`${URL}/${endPoint}?${queryParams.join("&")}`);
        }
        return this.http.get<PoliciaisDiarias>(`${URL}/${endPoint}`);
        //return this.http.get<PoliciaisCursos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<PolicialDiaria>{
        return this.http.get<PolicialDiaria>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialDiaria){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialDiaria){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    wherePol(id: number): Observable<PoliciaisDiarias>{
        return this.http.get<PoliciaisDiarias>(`${URL}/${endPoint}/${id}/wherepol`);
    }
   
}