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
        //return this.http.get<Armamentos>(`${URL}/${endPoint}/armamentos-vencendo`);
        return this.http.get<Armamentos>(`${URL}/${endPoint}/armamentos-vencendo?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getArmamentosEmprestados(): Observable<ArmamentosEmprestimos>{
        //return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}/armamentos-emprestados`);
        return this.http.get<ArmamentosEmprestimos>(`${URL}/${endPoint}/armamentos-emprestados?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getMateriaisConsumoVencendo(): Observable<MateriaisConsumo>{
        //return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/materiais-consumo-vencendo`);
        return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/materiais-consumo-vencendo?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getMateriaisConsumoAlerta(): Observable<MateriaisConsumo>{
        //return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/materiais-consumo-alerta`);
        return this.http.get<MateriaisConsumo>(`${URL}/${endPoint}/materiais-consumo-alerta?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getMateriaisPoliciaisEmprestados(): Observable<MateriaisPoliciais>{
        //return this.http.get<MateriaisPoliciais>(`${URL}/${endPoint}/materiais-policiais-emprestados`);
        return this.http.get<MateriaisPoliciais>(`${URL}/${endPoint}/materiais-policiais-emprestados?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getMateriaisVencendo(): Observable<Materiais>{
        //return this.http.get<Materiais>(`${URL}/${endPoint}/materiais-vencendo`);
        return this.http.get<Materiais>(`${URL}/${endPoint}/materiais-vencendo?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getPoliciais(): Observable<number>{
        //return this.http.get<number>(`${URL}/${endPoint}/policiais`);
        return this.http.get<number>(`${URL}/${endPoint}/policiais?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getAtestados(): Observable<number>{
        //return this.http.get<number>(`${URL}/${endPoint}/atestados`);
        return this.http.get<number>(`${URL}/${endPoint}/atestados?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getFerias(): Observable<number>{
        //return this.http.get<number>(`${URL}/${endPoint}/ferias`);
        return this.http.get<number>(`${URL}/${endPoint}/ferias?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getRequeridas(): Observable<number>{
        //return this.http.get<number>(`${URL}/${endPoint}/requeridas`);
        return this.http.get<number>(`${URL}/${endPoint}/requeridas?subunidade=${this.sessionService.getSubunidade()}`);
    }


    getPoliciaisGraduacoes(): Observable<any>{
        //return this.http.get<any>(`${URL}/${endPoint}/policiais-graduacoes`);
        return this.http.get<any>(`${URL}/${endPoint}/policiais-graduacoes?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getPoliciaisSetores(): Observable<any>{
        //return this.http.get<any>(`${URL}/${endPoint}/policiais-setores`);
        return this.http.get<any>(`${URL}/${endPoint}/policiais-setores?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getVeiculosManutencao(): Observable<VeiculosOficinas>{
        //return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/veiculos-manutencao`);
        return this.http.get<VeiculosOficinas>(`${URL}/${endPoint}/veiculos-manutencao?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getVeiculosTrocaOleo(): Observable<Veiculos>{
        //return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-troca-oleo`);
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-troca-oleo?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getVeiculosRevisao(): Observable<Veiculos>{
        //return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-revisao`);
        return this.http.get<Veiculos>(`${URL}/${endPoint}/veiculos-revisao?subunidade=${this.sessionService.getSubunidade()}`);
    }

    getVeiculosEmprestados(): Observable<VeiculosPoliciais>{
        //return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}/veiculos-emprestados`);
        return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}/veiculos-emprestados?subunidade=${this.sessionService.getSubunidade()}`);
    }

}