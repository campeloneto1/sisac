import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Pais, Paises } from "./pais";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'paises';

@Injectable({
    providedIn: 'root'
})
export class PaisesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Paises>{
        return this.http.get<Paises>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Pais>{
        return this.http.get<Pais>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Pais){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Pais){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}