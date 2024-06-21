import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Patrimonio, Patrimonios } from "./patrimonio";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'patrimonios';

@Injectable({
    providedIn: 'root'
})
export class PatrimoniosService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<Patrimonios>{
        return this.http.get<Patrimonios>(`${URL}/${endPoint}`);
        //return this.http.get<Patrimonios>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<Patrimonio>{
        return this.http.get<Patrimonio>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Patrimonio){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Patrimonio){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    disponiveis(): Observable<Patrimonios>{
        return this.http.get<Patrimonios>(`${URL}/${endPoint}/disponiveis`);
        //return this.http.get<Patrimonios>(`${URL}/${endPoint}/disponiveis?subunidade=${this.sessionService.getSubunidade()}`);
        
    }

   
}