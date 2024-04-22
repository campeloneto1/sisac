import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ArmamentoTamanho, ArmamentosTamanhos } from "./armamento-tamanho";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'armamentos-tamanhos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosTamanhosService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ArmamentosTamanhos>{
        return this.http.get<ArmamentosTamanhos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ArmamentoTamanho>{
        return this.http.get<ArmamentoTamanho>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ArmamentoTamanho){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ArmamentoTamanho){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}