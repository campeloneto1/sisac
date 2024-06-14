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
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ContratosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ContratosComponent implements OnInit, OnDestroy {
  protected data$!: Contratos;
  protected excluir!: Contrato;
  protected pesquisa!: string;
  protected temp!: Contratos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ContratosFormComponent) child!: ContratosFormComponent;

  constructor(
    private contratosService: ContratosService,
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
        || !pesq
      });
    }    
  }

}