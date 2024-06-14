import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContratoObjeto, ContratosObjetos } from './contrato-objeto';
import { ContratosObjetosService } from './contratos-objetos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ContratosObjetosFormComponent } from './formulario/contratos-objetos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-contratos-objetos',
  templateUrl: './contratos-objetos.component.html',
  styleUrl: './contratos-objetos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ContratosObjetosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ContratosObjetosComponent implements OnInit, OnDestroy {
  protected data$!: ContratosObjetos;
  protected excluir!: ContratoObjeto;
  protected pesquisa!: string;
  protected temp!: ContratosObjetos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ContratosObjetosFormComponent) child!: ContratosObjetosFormComponent;

  constructor(
    private contratosObjetosService: ContratosObjetosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.contratosObjetosService.index().subscribe({
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
    this.contratosObjetosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ContratoObjeto) {
    this.child.editar(data);
  }

  delete(data: ContratoObjeto) {
    this.excluir = data;
  }

  confirm() {
    this.contratosObjetosService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || !pesq
      });
    }
  }

}