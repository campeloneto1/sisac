import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Contrato } from "../contrato";
import { ContratosService } from "../contratos.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";

@Component({
    selector: 'app-contrato-print',
    templateUrl: './contrato-print.component.html',
    styleUrl: './contrato-print.component.css',
    standalone: true,
    imports: [
        CommonModule,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class ContratoPrint implements OnInit, OnDestroy{

    protected data$!: Contrato;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private contratosService: ContratosService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.contratosService.find(this.id).subscribe({
            next: (data) => {
                this.data$ = data;
            }
        });

        this.subscription2 =  this.subunidadesService.find(this.user.subunidade.id || 0).subscribe({
            next: (data) => {
                this.subunidade = data;
            }
        })
    }
    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    returnPercentUsado(){
        var percent = (this.data$.valor_usado * 100)/this.data$.valor_global;
        return percent.toFixed(2);
      }

    returnSumLancamentos(){
        var soma: number = 0;

        this.data$.contratos_lancamentos.forEach(data => {
            soma = Number(soma) + Number(data.valor);
        });
        return soma.toFixed(2);
      }

}