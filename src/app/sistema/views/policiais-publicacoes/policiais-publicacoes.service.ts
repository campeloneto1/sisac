import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PolicialPublicacao, PoliciaisPublicacoes } from "./policial-publicacao";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-publicacoes';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisPublicacoesService{

    constructor(
        private http: HttpClient,
       // private sessionService: SessionService,
    ){}

    index(): Observable<PoliciaisPublicacoes>{
        return this.http.get<PoliciaisPublicacoes>(`${URL}/${endPoint}`);
        //return this.http.get<PoliciaisPublicacoes>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<PolicialPublicacao>{
        return this.http.get<PolicialPublicacao>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialPublicacao){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialPublicacao){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    wherePol(id: number): Observable<PoliciaisPublicacoes>{
        return this.http.get<PoliciaisPublicacoes>(`${URL}/${endPoint}/${id}/wherepol`);
    }
   
}