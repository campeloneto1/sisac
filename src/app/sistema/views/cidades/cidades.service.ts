import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Cidade, Cidades } from "./cidade";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'cidades';

@Injectable({
    providedIn: 'root'
})
export class CidadesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Cidades>{
        return this.http.get<Cidades>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Cidade>{
        return this.http.get<Cidade>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Cidade){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Cidade){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
    whereEstado(id:number): Observable<Cidades>{
        return this.http.get<Cidades>(`${URL}/${endPoint}/${id}/whereEstado`)
    }
}