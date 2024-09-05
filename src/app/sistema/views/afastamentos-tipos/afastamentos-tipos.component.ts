import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AfastamentoTipo, AfastamentosTipos } from './afastamento-tipo';
import { AfastamentosTiposService } from './afastamentos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { AfastamentosTiposFormComponent } from './formulario/afastamentos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-afastamentos-tipos',
  templateUrl: './afastamentos-tipos.component.html',
  styleUrl: './afastamentos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    AfastamentosTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class AfastamentosTiposComponent implements OnInit, OnDestroy {
  protected data$!: AfastamentosTipos;
  protected excluir!: AfastamentoTipo;
  protected pesquisa!: string;
  protected temp!: AfastamentosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(AfastamentosTiposFormComponent) child!: AfastamentosTiposFormComponent;

  constructor(
    private afastamentosTiposService: AfastamentosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.afastamentosTiposService.index().subscribe({
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
    this.afastamentosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: AfastamentoTipo) {
    this.child.editar(data);
  }

  delete(data: AfastamentoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.afastamentosTiposService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}