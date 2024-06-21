import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicoTipo, ServicosTipos } from './servico-tipo';
import { ServicosTiposService } from './servicos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ServicosTiposFormComponent } from './formulario/servicos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-servicos-tipos',
  templateUrl: './servicos-tipos.component.html',
  styleUrl: './servicos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ServicosTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ServicosTiposComponent implements OnInit, OnDestroy {
  protected data$!: ServicosTipos;
  protected excluir!: ServicoTipo;
  protected pesquisa!: string;
  protected temp!: ServicosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ServicosTiposFormComponent) child!: ServicosTiposFormComponent;

  constructor(
    private servicosTiposService: ServicosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.servicosTiposService.index().subscribe({
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
    this.servicosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ServicoTipo) {
    this.child.editar(data);
  }

  delete(data: ServicoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.servicosTiposService.remove(this.excluir.id || 0).subscribe({
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