import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Observable } from "rxjs";
import { Armamentos } from "../armamentos/armamento";
import { VeiculosOficinas } from "../veiculos-oficinas/veiculo-oficina";
import { Veiculos } from "../veiculos/veiculo";

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

    getVeiculosManutencao(): Observable<VeiculosOficinas>{
        return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/veiculos-manutencao`);
    }

    getVeiculosTrocaOleo(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-troca-oleo`);
    }

}