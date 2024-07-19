import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Contrato } from "../contrato";
import { ContratosService } from "../contratos.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { ContratosLancamentosService } from "../../contratos-lancamentos/contratos-lancamentos.service";
import { ContratosLancamentosFormComponent } from "../../contratos-lancamentos/formulario/contratos-lancamentos-form.component";
import { ContratoLancamento } from "../../contratos-lancamentos/contrato-lancamento";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrl: './contrato.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        ContratosLancamentosFormComponent,
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
    protected rmvlancamento!: ContratoLancamento;
    private subscription:any;
    private subscription2:any;

    protected user!: User;

    @ViewChild(ContratosLancamentosFormComponent) childlancamento!: ContratosLancamentosFormComponent;

    constructor(
        private contratosService: ContratosService,
        private contratosLancamentosService: ContratosLancamentosService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('contratos');

        try {
          this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

          this.subscription =  this.contratosService.find(this.id).subscribe({
            next: (data) => {
                  if(!data){this.sessionService.redirect()}
                  this.contrato = data;
              }
          });
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

    refresh(){
      //@ts-ignore
      document.getElementById("closeModalButton").click();
      this.subscription2 =  this.contratosService.find(this.id).subscribe({
          next: (data) => {
              if(!data){this.sessionService.redirect()}
              this.contrato = data;
          }
      });
    }

    closeModal(){
      //@ts-ignore
      document.getElementById("closeModalButton").click();
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

    rmvLancamento(data: ContratoLancamento){
      this.rmvlancamento = data;
    }

      confirmRmvLancamento(id: number){
          this.contratosLancamentosService.remove(id).subscribe({
            next: (data) => {
              this.contratosService.find(this.contrato.id || 0).subscribe({
                next: (data) => {
                  this.contrato = data;
                  this.toastr.success('Exclusão realizada com sucesso!');
                }
              });
            }
          });
      }

      returnSumLancamentos(){
        var soma: number = 0;

        this.contrato.contratos_lancamentos.forEach(data => {
            soma = Number(soma) + Number(data.valor);
        });
        return soma.toFixed(2);
      }

      quantidadeDiariasUtilizadas(){
        var result = 0;
        if(this.contrato.quantidade_diarias){
         result = (this.contrato.quantidade_diarias * this.contrato.valor_usado) / this.contrato.valor_global;
        }
        return result.toFixed(2);
      }

      getSaldoDiarias(){
        if(this.contrato.quantidade_diarias){
          var result = this.contrato.quantidade_diarias - ((this.contrato.valor_usado*this.contrato.quantidade_diarias)/this.contrato.valor_global);
          return result.toFixed(2)
        }else{
          return null
        }
        
      }
}