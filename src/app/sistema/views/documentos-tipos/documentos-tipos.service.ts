import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { DocumentoTipo, DocumentosTipos } from "./documento-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'documentos-tipos';

@Injectable({
    providedIn: 'root'
})
export class DocumentosTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<DocumentosTipos>{
        return this.http.get<DocumentosTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<DocumentoTipo>{
        return this.http.get<DocumentoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: DocumentoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: DocumentoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}