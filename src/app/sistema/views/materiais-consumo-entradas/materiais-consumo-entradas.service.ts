import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisConsumoEntradas, MaterialConsumoEntrada } from "./material-consumo-entrada";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-consumo-entradas';

@Injectable({
    providedIn: 'root'
})
export class MateriaisConsumoEntradasService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisConsumoEntradas>{
        return this.http.get<MateriaisConsumoEntradas>(`${URL}/${endPoint}`);
        //return this.http.get<MateriaisConsumoEntradas>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<MaterialConsumoEntrada>{
        return this.http.get<MaterialConsumoEntrada>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialConsumoEntrada){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialConsumoEntrada){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}