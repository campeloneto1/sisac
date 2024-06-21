import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Materiais, Material } from "./material";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais';

@Injectable({
    providedIn: 'root'
})
export class MateriaisService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<Materiais>{
        return this.http.get<Materiais>(`${URL}/${endPoint}`);
        //return this.http.get<Materiais>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<Material>{
        return this.http.get<Material>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Material){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Material){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    disponiveis(): Observable<Materiais>{
        return this.http.get<Materiais>(`${URL}/${endPoint}/disponiveis`);
        //return this.http.get<Materiais>(`${URL}/${endPoint}/disponiveis?subunidade=${this.sessionService.getSubunidade()}`);
    }
   
}