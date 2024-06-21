import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Empresa, Empresas } from "./empresa";
import { Observable } from "rxjs";
import { SessionService } from "../../session.service";

const URL = environment.url;
const endPoint = 'empresas';

@Injectable({
    providedIn: 'root'
})
export class EmpresasService{

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,

    ){}

    index(): Observable<Empresas>{
        //return this.http.get<Empresas>(`${URL}/${endPoint}`);
        if(this.sessionService.getSubunidade()){
            return this.http.get<Empresas>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
        }else{
            return this.http.get<Empresas>(`${URL}/${endPoint}`);
        }
    }

    find(id: number): Observable<Empresa>{
        return this.http.get<Empresa>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Empresa){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Empresa){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
}