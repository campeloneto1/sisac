import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Servico, Servicos } from './servico';
import { ServicosService } from './servicos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ServicosFormComponent } from './formulario/servicos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { ContratosLancamentosFormComponent } from '../contratos-lancamentos/formulario/contratos-lancamentos-form.component';
import { ContratosLancamentosService } from '../contratos-lancamentos/contratos-lancamentos.service';
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ServicosFormComponent,
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
export class ServicosComponent implements OnInit, OnDestroy {
  protected data$!: Servicos;
  protected excluir!: Servico;
  protected pesquisa!: string;
  protected temp!: Servicos;
  protected quant: number = 10;
  protected subscription: any;
  protected contrato!: Servico;

  protected cadlancamento: boolean = false;

  @ViewChild(ServicosFormComponent) child!: ServicosFormComponent;

  constructor(
    private servicosService: ServicosService,
    private contratosLancamentosService: ContratosLancamentosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('servicos');
    this.subscription = this.servicosService.index().subscribe({
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
    this.servicosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Servico) {
    this.child.editar(data);
  }

  delete(data: Servico) {
    this.excluir = data;
  }

  confirm() {
    this.servicosService.remove(this.excluir.id || 0).subscribe({
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
        || data.servico_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }    
  }

}