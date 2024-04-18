import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Policial, Policiais } from "./policial";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Policiais>{
        return this.http.get<Policiais>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Policial>{
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
   
}