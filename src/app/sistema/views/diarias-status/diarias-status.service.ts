import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { DiariaStatus, DiariasStatus } from "./diaria-status";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'diarias-status';

@Injectable({
    providedIn: 'root'
})
export class DiariasStatusService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<DiariasStatus>{
        return this.http.get<DiariasStatus>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<DiariaStatus>{
        return this.http.get<DiariaStatus>(`${URL}/${endPoint}/${id}`);
    }

    create(data: DiariaStatus){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: DiariaStatus){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}