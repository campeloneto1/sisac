import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Subunidade, Subunidades } from "./subunidade";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'subunidades';

@Injectable({
    providedIn: 'root'
})
export class SubunidadesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Subunidades>{
        return this.http.get<Subunidades>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Subunidade>{
        return this.http.get<Subunidade>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Subunidade){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Subunidade){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    whereUnidade(id: number): Observable<Subunidades>{
        return this.http.get<Subunidades>(`${URL}/${endPoint}/${id}/whereUnidade`);
    }
   
}