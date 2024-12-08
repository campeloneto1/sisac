import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { DiariaTipo, DiariasTipos } from "./diaria-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'diarias-tipos';

@Injectable({
    providedIn: 'root'
})
export class DiariasTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<DiariasTipos>{
        return this.http.get<DiariasTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<DiariaTipo>{
        return this.http.get<DiariaTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: DiariaTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: DiariaTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}