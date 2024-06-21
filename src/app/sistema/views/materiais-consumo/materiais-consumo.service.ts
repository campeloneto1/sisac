import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MateriaisConsumo, MaterialConsumo } from "./material-consumo";
import { Observable } from "rxjs";
import { SessionService } from "../../session.service";

const URL = environment.url;
const endPoint = 'materiais-consumo';

@Injectable({
    providedIn: 'root'
})
export class MateriaisConsumoService{

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
    ){}

    index(): Observable<MateriaisConsumo>{
        //return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}`);
        return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<MaterialConsumo>{
        return this.http.get<MaterialConsumo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialConsumo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialConsumo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    disponiveis(): Observable<MateriaisConsumo>{
        //return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/disponiveis`);
        return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/disponiveis?subunidade=${this.sessionService.getSubunidade()}`);
    }
   
}