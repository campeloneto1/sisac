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
        this.sessionService.checkPermission('contratos');

        try {
          this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

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
      catch(e:any){
          this.sessionService.redirect()
      }

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

      returnCorUsado(){
        var percent = (this.data$.valor_usado * 100)/this.data$.valor_global;
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

    returnSumLancamentos(){
        var soma: number = 0;

        this.data$.contratos_lancamentos.forEach(data => {
            soma = Number(soma) + Number(data.valor);
        });
        return soma.toFixed(2);
      }

      quantidadeDiariasUtilizadas(){
        var result = 0;
        if(this.data$.quantidade_diarias){
         result = (this.data$.quantidade_diarias * this.data$.valor_usado) / this.data$.valor_global;
        }
        return result.toFixed(2);
      }

      getSaldoDiarias(){
        if(this.data$.quantidade_diarias){
          var result = this.data$.quantidade_diarias - ((this.data$.valor_usado*this.data$.quantidade_diarias)/this.data$.valor_global);
          return result.toFixed(2)
        }else{
          return null
        }
        
      }
}