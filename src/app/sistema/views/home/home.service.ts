import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Observable } from "rxjs";
import { Armamentos } from "../armamentos/armamento";

const URL = environment.url;
const endPoint = 'home';

@Injectable({
    providedIn: 'root'
})
export class HomeService{
    constructor(
        private http: HttpClient,
    ){}

    getPoliciais(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/policiais`);
    }

    getAtestados(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/atestados`);
    }

    getFerias(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/ferias`);
    }

    getPoliciaisSetores(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/policiais-setores`);
    }

    getArmamentosVencendo(): Observable<Armamentos>{
        return this.http.get<Armamentos>(`${URL}/${endPoint}/armamentos-vencendo`);
    }

}