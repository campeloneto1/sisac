import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Marca, Marcas } from "./marca";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'marcas';

@Injectable({
    providedIn: 'root'
})
export class MarcasService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Marcas>{
        return this.http.get<Marcas>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Marca>{
        return this.http.get<Marca>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Marca){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Marca){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
    marcasArmamentos(): Observable<Marcas>{
        return this.http.get<Marcas>(`${URL}/${endPoint}/armamentos`);
    }

    marcasLogistica(): Observable<Marcas>{
        return this.http.get<Marcas>(`${URL}/${endPoint}/logistica`);
    }

    marcasTransporte(): Observable<Marcas>{
        return this.http.get<Marcas>(`${URL}/${endPoint}/transporte`);
    }
}