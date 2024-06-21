import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ServicoTipo, ServicosTipos } from "./servico-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'servicos-tipos';

@Injectable({
    providedIn: 'root'
})
export class ServicosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ServicosTipos>{
        return this.http.get<ServicosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ServicoTipo>{
        return this.http.get<ServicoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ServicoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ServicoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}