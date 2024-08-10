import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Armamento, Armamentos } from "./armamento";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'armamentos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Armamentos>{
        return this.http.get<Armamentos>(`${URL}/${endPoint}`); 
    }

    find(id: number): Observable<Armamento>{
        return this.http.get<Armamento>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Armamento){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Armamento){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    disponiveis(): Observable<Armamentos>{
       return this.http.get<Armamentos>(`${URL}/${endPoint}/disponiveis`);   
    }
   
    ajustarQuantidade(id:number, data: any){
        return this.http.put(`${URL}/${endPoint}/${id}/ajustarquant`, data);
    }

    ajustarQuantidade2(id:number, data: any){
        return this.http.put(`${URL}/${endPoint}/${id}/ajustarquant2`, data);
    }
}