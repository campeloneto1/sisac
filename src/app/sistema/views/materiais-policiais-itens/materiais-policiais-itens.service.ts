import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisPoliciaisItens, MaterialPolicialItem } from "./material-policial-item";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'materiais-policiais-itens';

@Injectable({
    providedIn: 'root'
})
export class MateriaisPoliciaisItensService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<MateriaisPoliciaisItens>{
        return this.http.get<MateriaisPoliciaisItens>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<MaterialPolicialItem>{
        return this.http.get<MaterialPolicialItem>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialPolicialItem){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialPolicialItem){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}