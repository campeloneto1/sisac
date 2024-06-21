import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Oficina, Oficinas } from "./oficina";
import { Observable } from "rxjs";
import { SessionService } from "../../session.service";

const URL = environment.url;
const endPoint = 'oficinas';

@Injectable({
    providedIn: 'root'
})
export class OficinasService{

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
    ){}

    index(): Observable<Oficinas>{
        //return this.http.get<Oficinas>(`${URL}/${endPoint}`);
        return this.http.get<Oficinas>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Oficina>{
        return this.http.get<Oficina>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Oficina){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Oficina){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}