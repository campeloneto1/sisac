import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Policial, Policiais } from "./policial";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais';

interface PolParams{
    inativo?: boolean,
    ativo?: boolean,
}

@Injectable({
    providedIn: 'root'
})
export class PoliciaisService{

    constructor(
        private http: HttpClient,
    ){}

    index(params?:PolParams|null): Observable<Policiais>{
        if(params){
            let queryParams:Array<string> = [];
            if (params.inativo) {
                queryParams.push(`inativo=${params.inativo}`);
            }
            if (params.ativo) {
                queryParams.push(`ativo=${params.ativo}`);
            }
            return this.http.get<Policiais>(`${URL}/${endPoint}?${queryParams.join("&")}`);
        }
        return this.http.get<Policiais>(`${URL}/${endPoint}`);
    }

    getAll(): Observable<Policiais>{
        return this.http.get<Policiais>(`${URL}/${endPoint}/all`);
    }

    find(id: number): Observable<Policial>{
        return this.http.get<Policial>(`${URL}/${endPoint}/${id}`);
    }

    find2(id: number): Observable<Policial>{
        return this.http.get<Policial>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Policial){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Policial){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    disponiveis(): Observable<Policiais>{
        return this.http.get<Policiais>(`${URL}/${endPoint}/disponiveis`);
    }
   
    updateFoto(id:number, data: any){
        return this.http.put(`${URL}/${endPoint}/${id}/updatefoto`, data);
    }

   
}