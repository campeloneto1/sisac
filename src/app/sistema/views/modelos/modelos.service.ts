import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Modelo, Modelos } from "./modelo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'modelos';

@Injectable({
    providedIn: 'root'
})
export class ModelosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Modelos>{
        return this.http.get<Modelos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Modelo>{
        return this.http.get<Modelo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Modelo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Modelo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    whereMarca(id:number): Observable<Modelos>{
        return this.http.get<Modelos>(`${URL}/${endPoint}/${id}/whereMarca`)
    }
   
}