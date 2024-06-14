import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Escolaridade, Escolaridades } from "./escolaridade";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'escolaridades';

@Injectable({
    providedIn: 'root'
})
export class EscolaridadesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Escolaridades>{
        return this.http.get<Escolaridades>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Escolaridade>{
        return this.http.get<Escolaridade>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Escolaridade){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Escolaridade){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}