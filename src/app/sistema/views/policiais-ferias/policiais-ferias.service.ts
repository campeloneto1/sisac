import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { PolicialFerias, PoliciaisFerias } from "./policial-ferias";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'policiais-ferias';

@Injectable({
    providedIn: 'root'
})
export class PoliciaisFeriasService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<PoliciaisFerias>{
        return this.http.get<PoliciaisFerias>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<PolicialFerias>{
        return this.http.get<PolicialFerias>(`${URL}/${endPoint}/${id}`);
    }

    create(data: PolicialFerias){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: PolicialFerias){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}