import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisTipos, MaterialTipo } from "./material-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-tipos';

@Injectable({
    providedIn: 'root'
})
export class MateriaisTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisTipos>{
        return this.http.get<MateriaisTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<MaterialTipo>{
        return this.http.get<MaterialTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}