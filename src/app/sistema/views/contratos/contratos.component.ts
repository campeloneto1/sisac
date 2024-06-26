import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Contrato, Contratos } from './contrato';
import { ContratosService } from './contratos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ContratosFormComponent } from './formulario/contratos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { ContratosLancamentosFormComponent } from '../contratos-lancamentos/formulario/contratos-lancamentos-form.component';
import { ContratosLancamentosService } from '../contratos-lancamentos/contratos-lancamentos.service';
import { ContratosFormAditivarComponent } from './formulario-aditivar/contratos-form-aditivar.component';
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ContratosFormComponent,
    ContratosFormAditivarComponent,
    ContratosLancamentosFormComponent,
    DataTableModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class ContratosComponent implements OnInit, OnDestroy {
  protected data$!: Contratos;
  protected excluir!: Contrato;
  protected pesquisa!: string;
  protected temp!: Contratos;
  protected quant: number = 10;
  protected subscription: any;
  protected contrato!: Contrato;
  protected contratoadt!: Contrato;

  protected cadlancamento: boolean = false;

  @ViewChild(ContratosFormComponent) child!: ContratosFormComponent;
  @ViewChild(ContratosFormAditivarComponent) childaditivar!: ContratosFormAditivarComponent;
  @ViewChild(ContratosLancamentosFormComponent) childlancamento!: ContratosLancamentosFormComponent;

  constructor(
    private contratosService: ContratosService,
    private contratosLancamentosService: ContratosLancamentosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('contratos');
    this.subscription = this.contratosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
        this.temp = data;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.contratosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Contrato) {
    this.child.editar(data);
  }

  delete(data: Contrato) {
    this.excluir = data;
  }

  confirm() {
    this.contratosService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.empresa.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.empresa.cnpj.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.numero_contrato.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.numero_sacc.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.contrato_objeto.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.contrato_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }    
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

  showLanc(data: Contrato){
    this.contratosService.find(data.id || 0).subscribe({
      next: (data: Contrato) => {
        this.contrato = data;
      },
      error: (error: any) => {
        this.toastr.error('Erro ao consultar contrato!');
      },
    })
  }

  refreshLancamentos(){
    this.cadlancamento = false;
    this.contratosService.find(this.contrato.id || 0).subscribe({
      next: (data: Contrato) => {
        this.contrato = data;
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao consultar contrato!');
      },
    })
  }

  cancelarCadLancamento(){
    this.cadlancamento = false;
  }

  rmvLancamento(id: number){
    if(window.confirm("Tem certeza que deseja excluir o lançamento?")){
      this.contratosLancamentosService.remove(id).subscribe({
        next: (data) => {
          this.contratosService.find(this.contrato.id || 0).subscribe({
            next: (data) => {
              this.contrato = data;
              this.refresh();
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

  aditivar(data:Contrato){
    this.contratoadt = data;
  }

  getSaldoDiarias(data:Contrato){
    if(data.quantidade_diarias){
      var result = data.quantidade_diarias - ((data.valor_usado*data.quantidade_diarias)/data.valor_global);
      return result.toFixed(2)
    }else{
      return null
    }
    
  }

}