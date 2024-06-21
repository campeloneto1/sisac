import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import {PoliciaisRequeridas, PolicialRequerida } from "./policial-requerida";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-requeridas';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisRequeridasService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<PoliciaisRequeridas>{
        return this.http.get<PoliciaisRequeridas>(`${URL}/${endPoint}`);
        //return this.http.get<PoliciaisRequeridas>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<PolicialRequerida>{
        return this.http.get<PolicialRequerida>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialRequerida){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialRequerida){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}