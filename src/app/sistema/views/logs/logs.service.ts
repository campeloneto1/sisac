import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Log, Logs } from "./log";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'logs';

@Injectable({
    providedIn: 'root'
})
export class LogsService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Logs>{
        return this.http.get<Logs>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Log>{
        return this.http.get<Log>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Log){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Log){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}