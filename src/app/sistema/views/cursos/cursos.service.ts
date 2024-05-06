import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Curso, Cursos } from "./curso";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'cursos';

@Injectable({
    providedIn: 'root'
})
export class CursosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Cursos>{
        return this.http.get<Cursos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Curso>{
        return this.http.get<Curso>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Curso){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Curso){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}