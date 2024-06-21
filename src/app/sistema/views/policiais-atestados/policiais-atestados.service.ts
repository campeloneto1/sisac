import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PolicialAtestado, PoliciaisAtestados } from "./policial-atestado";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-atestados';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisAtestadosService{

    constructor(
        private http: HttpClient,
       // private sessionService: SessionService,
    ){}

    index(): Observable<PoliciaisAtestados>{
        return this.http.get<PoliciaisAtestados>(`${URL}/${endPoint}`);
        //return this.http.get<PoliciaisAtestados>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<PolicialAtestado>{
        return this.http.get<PolicialAtestado>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialAtestado){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialAtestado){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}