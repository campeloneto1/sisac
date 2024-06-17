import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Contrato } from "../contrato";
import { ContratosService } from "../contratos.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { ContratosLancamentosService } from "../../contratos-lancamentos/contratos-lancamentos.service";

@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrl: './contrato.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
        DataTableModule
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class ContratoComponent implements OnInit, OnDestroy{

    protected contrato!: Contrato;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    constructor(
        private contratosService: ContratosService,
        private contratosLancamentosService: ContratosLancamentosService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('contratos');
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.contratosService.find(this.id).subscribe({
            next: (data) => {
                if(!data){this.sessionService.redirect()}
                this.contrato = data;
            }
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    returnPercentUsado(){
      var percent = (this.contrato.valor_usado * 100)/this.contrato.valor_global;
      return percent.toFixed(2);
    }
  
    returnCorUsado(){
      var percent = (this.contrato.valor_usado * 100)/this.contrato.valor_global;
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

      rmvLancamento(id: number){
        if(window.confirm("Tem certeza que deseja excluir o lançamento?")){
          this.contratosLancamentosService.remove(id).subscribe({
            next: (data) => {
              this.contratosService.find(this.contrato.id || 0).subscribe({
                next: (data) => {
                  this.contrato = data;
                }
              });
            }
          });
        }
      }

      returnSumLancamentos(){
        var soma: number = 0;

        this.contrato.contratos_lancamentos.forEach(data => {
            soma = Number(soma) + Number(data.valor);
        });
        return soma.toFixed(2);
      }
}