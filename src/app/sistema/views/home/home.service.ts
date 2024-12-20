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
import { SessionService } from "../../session.service";
import { Contratos } from "../contratos/contrato";

const URL = environment.url;
const endPoint = 'home';

@Injectable({
    providedIn: 'root'
})
export class HomeService{
    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
    ){}

    getArmamentosVencendo(): Observable<Armamentos>{
        return this.http.get<Armamentos>(`${URL}/${endPoint}/armamentos-vencendo`);
    }

    getArmamentosEmprestados(): Observable<ArmamentosEmprestimos>{
        return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}/armamentos-emprestados`);
    }

    getContratosAcabando(): Observable<Contratos>{
        return this.http.get<Contratos>(`${URL}/${endPoint}/contratos-acabando`);
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

    getPoliciaisInativos(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/policiais-inativos`);
    }

    getAtestados(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/atestados`);
    }

    getCursos(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/cursos`);
    }

    getFerias(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/ferias`);
    }

    getRequeridas(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/requeridas`);
    }

    getPoliciaisDiarias(): Observable<any>{
        return this.http.get<any>(`${URL}/${endPoint}/policiais-diarias`);
    }

    getPoliciaisDiariasQuant(): Observable<number>{
        return this.http.get<any>(`${URL}/${endPoint}/policiais-diarias-quant`);
    }

    getPoliciaisDiariasQuantAberto(): Observable<number>{
        return this.http.get<any>(`${URL}/${endPoint}/policiais-diarias-quantaberto`);
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

    getVeiculos(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/veiculos`);
    }

    getVeiculosViagem(): Observable<number>{
        return this.http.get<number>(`${URL}/${endPoint}/veiculos-viagem`);
    }

    getVeiculosDispViagem(): Observable<Veiculos>{
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-dispviagem`);
    }

}