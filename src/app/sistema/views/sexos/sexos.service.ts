import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Sexo, Sexos } from "./sexo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'sexos';

@Injectable({
    providedIn: 'root'
})
export class SexosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Sexos>{
        return this.http.get<Sexos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Sexo>{
        return this.http.get<Sexo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Sexo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Sexo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}