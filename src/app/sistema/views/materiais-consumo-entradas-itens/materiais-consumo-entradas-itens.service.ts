import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisConsumoEntradasItens, MaterialConsumoEntradaItem } from "./material-consumo-entrada-item";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-consumo-entradas-itens';

@Injectable({
    providedIn: 'root'
})
export class MateriaisConsumoEntradasItensService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisConsumoEntradasItens>{
        return this.http.get<MateriaisConsumoEntradasItens>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<MaterialConsumoEntradaItem>{
        return this.http.get<MaterialConsumoEntradaItem>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialConsumoEntradaItem){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialConsumoEntradaItem){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}