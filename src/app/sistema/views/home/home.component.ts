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
    protected policiaisGraduacoes!: any;
    protected policiaisSetores!: any;
    protected armamentosVencendo!: Armamentos;
    protected armamentosEmprestimos!: ArmamentosEmprestimos;
    protected veiculosManutencao!: VeiculosOficinas;
    protected veiculosTrocaOleo!: Veiculos;
    protected veiculosPoliciais!: VeiculosPoliciais;

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;
    protected subscription4: any;
    protected subscription5: any;
    protected subscription6: any;
    protected subscription7: any;
    protected subscription8: any;
    protected subscription9: any;
    protected subscription10: any;

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
        if(this.user.perfil.armamentos){
            this.subscription4 = this.homeService.getArmamentosVencendo().subscribe({
                next: (data) => {
                    this.armamentosVencendo = data;
                }
            });
        }
        if(this.user.perfil.armamentos_emprestimos){
            this.subscription9 = this.homeService.getArmamentosEmprestados().subscribe({
                next: (data) => {
                    this.armamentosEmprestimos = data;
                }
            });
        }
        if(this.user.perfil.veiculos_oficinas){
            this.subscription5 = this.homeService.getVeiculosManutencao().subscribe({
                next: (data) => {
                    this.veiculosManutencao = data;
                }
            });
        }
        if(this.user.perfil.veiculos){
            this.subscription6 = this.homeService.getVeiculosTrocaOleo().subscribe({
                next: (data) => {
                    this.veiculosTrocaOleo = data;
                }
            });
        }
        if(this.user.perfil.policiais){
         this.subscription7 = this.homeService.getPoliciaisSetores().subscribe({
             next: (data) => {
                 this.policiaisSetores = data;
             }
         });
        }
        if(this.user.perfil.policiais){
            this.subscription7 = this.homeService.getPoliciaisGraduacoes().subscribe({
                next: (data) => {
                    this.policiaisGraduacoes = data;
                }
            });
           }
        if(this.user.perfil.veiculos_policiais){
            this.subscription8 = this.homeService.getVeiculosEmprestados().subscribe({
                next: (data) => {
                    this.veiculosPoliciais = data;
                }
            });
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
        if(this.subscription4){
            this.subscription4.unsubscribe();
        }
        if(this.subscription5){
            this.subscription5.unsubscribe();
        }
        if(this.subscription6){
            this.subscription6.unsubscribe();
        }
        if(this.subscription7){
            this.subscription7.unsubscribe();
        }
        if(this.subscription8){
            this.subscription8.unsubscribe();
        }
        if(this.subscription9){
            this.subscription9.unsubscribe();
        }
        if(this.subscription10){
            this.subscription10.unsubscribe();
        }
    }
}