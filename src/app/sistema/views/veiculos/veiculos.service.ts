import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Veiculo, Veiculos } from "./veiculo";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'veiculos';

@Injectable({
    providedIn: 'root'
})
export class VeiculosService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<Veiculo>{
        return this.http.get<Veiculo>(`${URL}/${endPoint}/${id}`);
    }

    create(data: Veiculo){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: Veiculo){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    disponiveis(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/disponiveis`);
    }

    getAll(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/all`);
    }
   
}