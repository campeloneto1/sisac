import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Armamento, Armamentos } from "./armamento";
import { Observable } from "rxjs";
import { StorageService } from "../../storage.service";
import { SessionService } from "../../session.service";

const URL = environment.url;
const endPoint = 'armamentos';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosService{

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ){}

    index(): Observable<Armamentos>{
        return this.http.get<Armamentos>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`); 
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
       return this.http.get<Armamentos>(`${URL}/${endPoint}/disponiveis?subunidade=${this.sessionService.getSubunidade()}`);   
    }
   
    ajustarQuantidade(id:number, data: any){
        return this.http.put(`${URL}/${endPoint}/${id}/ajustarquant`, data);
    }
}