import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisConsumoSaidasItens, MaterialConsumoSaidaItem } from "./material-consumo-saida-item";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-consumo-saidas-itens';

@Injectable({
    providedIn: 'root'
})
export class MateriaisConsumoSaidasItensService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisConsumoSaidasItens>{
        return this.http.get<MateriaisConsumoSaidasItens>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<MaterialConsumoSaidaItem>{
        return this.http.get<MaterialConsumoSaidaItem>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialConsumoSaidaItem){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialConsumoSaidaItem){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}