import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ArmamentoCalibre, ArmamentosCalibres } from "./armamento-calibre";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'armamentos-calibres';

@Injectable({
    providedIn: 'root'
})
export class ArmamentosCalibresService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<ArmamentosCalibres>{
        return this.http.get<ArmamentosCalibres>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<ArmamentoCalibre>{
        return this.http.get<ArmamentoCalibre>(`${URL}/${endPoint}/${id}`);
    }

    create(data: ArmamentoCalibre){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: ArmamentoCalibre){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}