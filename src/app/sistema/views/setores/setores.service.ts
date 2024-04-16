import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Setor, Setores } from "./setor";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'setores';

@Injectable({
    providedIn: 'root'
})
export class SetoresService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Setores>{
        return this.http.get<Setores>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Setor>{
        return this.http.get<Setor>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Setor){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Setor){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}