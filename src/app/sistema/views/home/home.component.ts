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
import { Contrato, Contratos } from "../contratos/contrato";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { RouterModule } from "@angular/router";
import { VeiculosPoliciaisService } from "../veiculos-policiais/veiculos-policiais.service";
import { ArmamentosEmprestimosShow } from "../armamentos-emprestimos/show/armamentos-emprestimos-show.component";
import { VeiculosPoliciaisShow } from "../veiculos-policiais/show/veiculos-policiais-show.component";
import { StorageService } from "../../storage.service";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    imports: [
        CommonModule, 
        InfoBox,
        RouterModule,
        NgxMaskDirective,
        NgxMaskPipe,
        ArmamentosEmprestimosShow,
        VeiculosPoliciaisShow
    ],
    providers: [
        provideNgxMask()
      ]
})

export class HomeComponent implements OnInit, OnDestroy{
    protected user!: User;

    protected quantPoliciais!: any;
    protected quantAtestados!: any;
    protected quantFerias!: any;
    protected quantRequeridas!: any;
    protected quantCursos!: any;
    protected quantVeiculos!: any;
    protected quantVeiculosViagem!: any;
    protected quantVeiculosDispViagem$!: Observable<Veiculos>;
    protected armamentosVencendo$!: Observable<Armamentos>;
    protected armamentosEmprestimos$!: Observable<ArmamentosEmprestimos>;
    protected contratosAcabando$!: Observable<Contratos>;
    protected materiaisVencendo$!: Observable<Materiais>;
    protected materiaisConsumoVencendo$!: Observable<MateriaisConsumo>;
    protected materiaisConsumoAlerta$!: Observable<MateriaisConsumo>;
    protected materiaisPoliciaisEmprestados$!: Observable<MateriaisPoliciais>;
    protected policiaisGraduacoes$!: Observable<any>;
    protected policiaisSetores$!: Observable<any>;
    protected veiculosManutencao$!: Observable<VeiculosOficinas>;
    protected veiculosTrocaOleo$!: Observable<Veiculos>;
    protected veiculosRevisao$!: Observable<Veiculos>;
    protected veiculosPoliciais$!: Observable<VeiculosPoliciais>;
    protected temEmprestimo: boolean = false;

    protected subunidade!: any;

    protected show:number = 0;

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;
    protected subscription4: any;
    protected subscription5: any;

    constructor(
        private sessionService: SessionService,
        private homeService: HomeService,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private storageService: StorageService,
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.subunidade = this.sessionService.getSubunidade();

        if(localStorage.getItem('showhome')){
           
            this.show = Number(this.storageService.getItem('showhome'));
        }else{
            if(this.user.perfil.policiais){
                this.show = 1;
            }else if(this.user.perfil.materiais || this.user.perfil.materiais_consumo){
                this.show = 1;
            }else if(this.user.perfil.veiculos){
                this.show = 3;
            }else if(this.user.perfil.armamentos){
                this.show = 4;
            }else if(this.user.perfil.contratos){
                this.show = 5;
            }
        }

       

        if(this.user){
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
            if(this.user.perfil.policiais_cursos){
                this.subscription3 = this.homeService.getCursos().subscribe({
                    next: (data) => {
                        this.quantCursos = data;
                    }
                });
            }
            if(this.user.perfil.policiais_ferias){
                this.subscription4 = this.homeService.getFerias().subscribe({
                    next: (data) => {
                        this.quantFerias = data;
                    }
                });
            }
            if(this.user.perfil.policiais_requeridas){
                this.subscription5 = this.homeService.getRequeridas().subscribe({
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
                this.veiculosRevisao$ = this.homeService.getVeiculosRevisao();
                this.quantVeiculosDispViagem$ = this.homeService.getVeiculosDispViagem();
                this.subscription4 = this.homeService.getVeiculos().subscribe({
                    next: (data) => {
                        this.quantVeiculos = data;
                    }
                });
                this.subscription4 = this.homeService.getVeiculosViagem().subscribe({
                    next: (data) => {
                        this.quantVeiculosViagem = data;
                    }
                });
                
            }
            if(this.user.perfil.policiais){
                this.policiaisSetores$ = this.homeService.getPoliciaisSetores();
           
                this.policiaisGraduacoes$ = this.homeService.getPoliciaisGraduacoes();
               }
            if(this.user.perfil.veiculos_policiais){
                this.veiculosPoliciais$ = this.homeService.getVeiculosEmprestados();
            }
    
            if(this.user.perfil.materiais_consumo){
                this.materiaisConsumoAlerta$ = this.homeService.getMateriaisConsumoAlerta();
                this.materiaisConsumoVencendo$ = this.homeService.getMateriaisConsumoVencendo();
            }
            if(this.user.perfil.materiais_policiais){
                this.materiaisPoliciaisEmprestados$ = this.homeService.getMateriaisPoliciaisEmprestados();
            }
    
            if(this.user.perfil.materiais){
                this.materiaisVencendo$ = this.homeService.getMateriaisVencendo();
            }

            if(this.user.perfil.contratos){
                this.contratosAcabando$ = this.homeService.getContratosAcabando();
            }

            this.veiculosPoliciaisService.veiculoPolicial().subscribe({
                next: (data) => {
                    if(data){
                        this.temEmprestimo = true;
                    }
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
    }

    disponiveis(){
        return `${this.quantPoliciais - this.quantAtestados - this.quantFerias - this.quantCursos}`;
    }

    returnPercentUsado(data: Contrato){
        var percent = (data.valor_usado * 100)/data.valor_global;
        return percent.toFixed(2);
      }
    
      returnCorUsado(data: Contrato){
        var percent = (data.valor_usado * 100)/data.valor_global;
        var color = '';
        if(percent < 50){
          color = 'bg-success'
        }else if(percent < 70){
          color = 'bg-warning'
        }else{
          color = 'bg-danger'
        }
        return color;
      }

      changeShow(num: number){
        this.show = num;
        this.storageService.setItem('showhome', num+'');
      }
}