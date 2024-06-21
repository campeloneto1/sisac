import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Servico, Servicos } from "./servico";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'servicos';

@Injectable({
    providedIn: 'root'
})
export class ServicosService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<Servicos>{
        return this.http.get<Servicos>(`${URL}/${endPoint}`);
        //return this.http.get<Servicos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<Servico>{
        return this.http.get<Servico>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Servico){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Servico){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}