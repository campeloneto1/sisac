import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Unidade, Unidades } from "./unidade";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'unidades';

@Injectable({
    providedIn: 'root'
})
export class UnidadesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Unidades>{
        return this.http.get<Unidades>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Unidade>{
        return this.http.get<Unidade>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Unidade){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Unidade){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}