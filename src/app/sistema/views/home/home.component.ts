import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { InfoBox } from "../../components/info-box/info-box.component";
import { SessionService } from "../../session.service";
import { User } from "../users/user";
import { HomeService } from "./home.service";
import { Observable } from "rxjs";
import { Armamentos } from "../armamentos/armamento";
import { VeiculosOficinas } from "../veiculos-oficinas/veiculo-oficina";
import { Veiculos } from "../veiculos/veiculo";
import { VeiculosPoliciais } from "../veiculos-policiais/veiculo-policial";
import { ArmamentosEmprestimos } from "../armamentos-emprestimos/armamento-emprestimo";
import { MateriaisConsumo } from "../materiais-consumo/material-consumo";
import { MateriaisPoliciais } from "../materiais-policiais/material-policial";
import { Materiais } from "../materiais/material";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    imports: [CommonModule, InfoBox]
})

export class HomeComponent implements OnInit, OnDestroy{
    protected user!: User;

    protected quantPoliciais!: any;
    protected quantAtestados!: any;
    protected quantFerias!: any;
    protected quantRequeridas!: any;
    protected policiaisGraduacoes$!: Observable<any>;
    protected policiaisSetores$!: Observable<any>;
    protected armamentosVencendo$!: Observable<Armamentos>;
    protected armamentosEmprestimos$!: Observable<ArmamentosEmprestimos>;
    protected veiculosManutencao$!: Observable<VeiculosOficinas>;
    protected veiculosTrocaOleo$!: Observable<Veiculos>;
    protected veiculosRevisao$!: Observable<Veiculos>;
    protected veiculosPoliciais$!: Observable<VeiculosPoliciais>;
    protected materiaisVencendo$!: Observable<Materiais>;
    protected materiaisConsumoVencendo$!: Observable<MateriaisConsumo>;
    protected materiaisConsumoAlerta$!: Observable<MateriaisConsumo>;
    protected materiaisPoliciaisEmprestados$!: Observable<MateriaisPoliciais>;

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;
    

    constructor(
        private sessionService: SessionService,
        private homeService: HomeService
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        if(this.user.perfil.policiais){
            this.subscription = this.homeService.getPoliciais().subscribe({
                next: (data) => {
                    this.quantPoliciais = data;
                }
            });
        }
        if(this.user.perfil.policiais_atestados){
            this.subscription2 = this.homeService.getAtestados().subscribe({
                next: (data) => {
                    this.quantAtestados = data;
                }
            });
        }
        if(this.user.perfil.policiais_ferias){
            this.subscription3 = this.homeService.getFerias().subscribe({
                next: (data) => {
                    this.quantFerias = data;
                }
            });
        }
        if(this.user.perfil.policiais_requeridas){
            this.subscription3 = this.homeService.getRequeridas().subscribe({
                next: (data) => {
                    this.quantRequeridas = data;
                }
            });
        }
        if(this.user.perfil.armamentos){
            this.armamentosVencendo$ = this.homeService.getArmamentosVencendo();
        }
        if(this.user.perfil.armamentos_emprestimos){
            this.armamentosEmprestimos$ = this.homeService.getArmamentosEmprestados();
        }
        if(this.user.perfil.veiculos_oficinas){
            this.veiculosManutencao$ = this.homeService.getVeiculosManutencao();
        }
        if(this.user.perfil.veiculos){
            this.veiculosTrocaOleo$ = this.homeService.getVeiculosTrocaOleo();
        }
        if(this.user.perfil.veiculos){
            this.veiculosRevisao$ = this.homeService.getVeiculosRevisao();
        }
        if(this.user.perfil.policiais){
            this.policiaisSetores$ = this.homeService.getPoliciaisSetores();
        }
        if(this.user.perfil.policiais){
            this.policiaisGraduacoes$ = this.homeService.getPoliciaisGraduacoes();
           }
        if(this.user.perfil.veiculos_policiais){
            this.veiculosPoliciais$ = this.homeService.getVeiculosEmprestados();
        }

        if(this.user.perfil.materiais_consumo){
            this.materiaisConsumoAlerta$ = this.homeService.getMateriaisConsumoAlerta();
        }

        if(this.user.perfil.materiais_consumo){
            this.materiaisConsumoVencendo$ = this.homeService.getMateriaisConsumoVencendo();
        }
        if(this.user.perfil.materiais_policiais){
            this.materiaisPoliciaisEmprestados$ = this.homeService.getMateriaisPoliciaisEmprestados();
        }

        if(this.user.perfil.materiais){
            this.materiaisVencendo$ = this.homeService.getMateriaisVencendo();
        }
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
        
    }
}