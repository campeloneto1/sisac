import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Documento, Documentos } from "./documento";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'documentos';

@Injectable({
    providedIn: 'root'
})
export class DocumentosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Documentos>{
        return this.http.get<Documentos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Documento>{
        return this.http.get<Documento>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Documento){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Documento){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}