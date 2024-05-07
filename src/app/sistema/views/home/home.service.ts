import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Observable } from "rxjs";
import { Armamentos } from "../armamentos/armamento";
import { VeiculosOficinas } from "../veiculos-oficinas/veiculo-oficina";
import { Veiculos } from "../veiculos/veiculo";
import { VeiculosPoliciais } from "../veiculos-policiais/veiculo-policial";
import { ArmamentosEmprestimos } from "../armamentos-emprestimos/armamento-emprestimo";

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

    getPoliciaisGraduacoes(): Observable<any>{
        return this.http.get<any>(`${URL}/${endPoint}/policiais-graduacoes`);
    }

    getPoliciaisSetores(): Observable<any>{
        return this.http.get<any>(`${URL}/${endPoint}/policiais-setores`);
    }

    getArmamentosVencendo(): Observable<Armamentos>{
        return this.http.get<Armamentos>(`${URL}/${endPoint}/armamentos-vencendo`);
    }

    getArmamentosEmprestados(): Observable<ArmamentosEmprestimos>{
        return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}/armamentos-emprestados`);
    }

    getVeiculosManutencao(): Observable<VeiculosOficinas>{
        return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/veiculos-manutencao`);
    }

    getVeiculosTrocaOleo(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-troca-oleo`);
    }

    getVeiculosEmprestados(): Observable<VeiculosPoliciais>{
        return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}/veiculos-emprestados`);
    }

}