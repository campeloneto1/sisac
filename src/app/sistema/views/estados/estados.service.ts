import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Estado, Estados } from "./estado";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'estados';

@Injectable({
    providedIn: 'root'
})
export class EstadosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Estados>{
        return this.http.get<Estados>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Estado>{
        return this.http.get<Estado>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Estado){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Estado){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    wherePais(id:number): Observable<Estados>{
        return this.http.get<Estados>(`${URL}/${endPoint}/${id}/wherePais`)
    }
   
}