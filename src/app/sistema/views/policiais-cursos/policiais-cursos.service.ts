import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PoliciaisCursos, PolicialCurso } from "./policial-curso";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-cursos';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisCursosService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(params:any): Observable<PoliciaisCursos>{
        if(params){
            let queryParams:Array<string> = [];
            if (params.ativo) {
                queryParams.push(`ativo=${params.ativo}`);
            }
            return this.http.get<PoliciaisCursos>(`${URL}/${endPoint}?${queryParams.join("&")}`);
        }
        return this.http.get<PoliciaisCursos>(`${URL}/${endPoint}`);
        //return this.http.get<PoliciaisCursos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<PolicialCurso>{
        return this.http.get<PolicialCurso>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialCurso){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialCurso){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    wherePol(id: number): Observable<PoliciaisCursos>{
        return this.http.get<PoliciaisCursos>(`${URL}/${endPoint}/${id}/wherepol`);
    }
   
}