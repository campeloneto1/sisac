import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Funcao, Funcoes } from "./funcao";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'funcoes';

@Injectable({
    providedIn: 'root'
})
export class FuncoesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Funcoes>{
        return this.http.get<Funcoes>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Funcao>{
        return this.http.get<Funcao>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Funcao){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Funcao){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}