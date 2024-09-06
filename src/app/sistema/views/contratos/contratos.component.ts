import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Contrato, Contratos } from './contrato';
import { ContratosService } from './contratos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ContratosFormComponent } from './formulario/contratos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { ContratosLancamentosFormComponent } from '../contratos-lancamentos/formulario/contratos-lancamentos-form.component';
import { ContratosLancamentosService } from '../contratos-lancamentos/contratos-lancamentos.service';
import { ContratosFormAditivarComponent } from './formulario-aditivar/contratos-form-aditivar.component';
import { SharedService } from '../../shared/shared.service';
import { User } from '../users/user';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
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
    DataTablesModule,
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
  protected data$!: Observable<Contratos>;
  protected excluir!: Contrato;
  protected pesquisa!: string;
  protected temp!: Contratos;
  protected quant: number = 10;
  protected subscription: any;
  protected contrato!: Contrato;
  protected contratoadt!: Contrato;

  protected user!: User;

  protected cadlancamento: boolean = false;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ContratosFormComponent) child!: ContratosFormComponent;
  @ViewChild(ContratosFormAditivarComponent) childaditivar!: ContratosFormAditivarComponent;
  @ViewChild(ContratosLancamentosFormComponent) childlancamento!: ContratosLancamentosFormComponent;

  constructor(
    private contratosService: ContratosService,
    private contratosLancamentosService: ContratosLancamentosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('contratos');

    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.contratosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ =  this.contratosService.index();
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

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}