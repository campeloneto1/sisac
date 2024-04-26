import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Cor, Cores } from "./cor";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'cores';

@Injectable({
    providedIn: 'root'
})
export class CoresService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Cores>{
        return this.http.get<Cores>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Cor>{
        return this.http.get<Cor>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Cor){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Cor){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}