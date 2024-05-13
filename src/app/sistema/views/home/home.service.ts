import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Observable } from "rxjs";
import { Armamentos } from "../armamentos/armamento";
import { VeiculosOficinas } from "../veiculos-oficinas/veiculo-oficina";
import { Veiculos } from "../veiculos/veiculo";
import { VeiculosPoliciais } from "../veiculos-policiais/veiculo-policial";
import { ArmamentosEmprestimos } from "../armamentos-emprestimos/armamento-emprestimo";
import { MateriaisConsumo } from "../materiais-consumo/material-consumo";
import { MateriaisPoliciais } from "../materiais-policiais/material-policial";
import { Materiais } from "../materiais/material";

const URL = environment.url;
const endPoint = 'home';

@Injectable({
    providedIn: 'root'
})
export class HomeService{
    constructor(
        private http: HttpClient,
    ){}

    getArmamentosVencendo(): Observable<Armamentos>{
        return this.http.get<Armamentos>(`${URL}/${endPoint}/armamentos-vencendo`);
    }

    getArmamentosEmprestados(): Observable<ArmamentosEmprestimos>{
        return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}/armamentos-emprestados`);
    }

    getMateriaisConsumoVencendo(): Observable<MateriaisConsumo>{
        return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/materiais-consumo-vencendo`);
    }

    getMateriaisConsumoAlerta(): Observable<MateriaisConsumo>{
        return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/materiais-consumo-alerta`);
    }

    getMateriaisPoliciaisEmprestados(): Observable<MateriaisPoliciais>{
        return this.http.get<MateriaisPoliciais>(`${URL}/${endPoint}/materiais-policiais-emprestados`);
    }

    getMateriaisVencendo(): Observable<Materiais>{
        return this.http.get<Materiais>(`${URL}/${endPoint}/materiais-vencendo`);
    }

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

    getVeiculosManutencao(): Observable<VeiculosOficinas>{
        return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/veiculos-manutencao`);
    }

    getVeiculosTrocaOleo(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-troca-oleo`);
    }

    getVeiculosRevisao(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-revisao`);
    }

    getVeiculosEmprestados(): Observable<VeiculosPoliciais>{
        return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}/veiculos-emprestados`);
    }

}