import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisConsumoTipos, MaterialConsumoTipo } from "./material-consumo-tipo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-consumo-tipos';

@Injectable({
    providedIn: 'root'
})
export class MateriaisConsumoTiposService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisConsumoTipos>{
        return this.http.get<MateriaisConsumoTipos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<MaterialConsumoTipo>{
        return this.http.get<MaterialConsumoTipo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialConsumoTipo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialConsumoTipo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}