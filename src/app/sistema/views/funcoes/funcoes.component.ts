import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Funcao, Funcoes } from './funcao';
import { FuncoesService } from './funcoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { FuncoesFormComponent } from './formulario/funcoes-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.component.html',
  styleUrl: './funcoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    FuncoesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class FuncoesComponent implements OnInit, OnDestroy {
  protected data$!: Funcoes;
  protected excluir!: Funcao;
  protected pesquisa!: string;
  protected temp!: Funcoes;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(FuncoesFormComponent) child!: FuncoesFormComponent;

  constructor(
    private funcoesService: FuncoesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('gestor');
    this.subscription = this.funcoesService.index().subscribe({
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
    this.funcoesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Funcao) {
    this.child.editar(data);
  }

  delete(data: Funcao) {
    this.excluir = data;
  }

  confirm() {
    this.funcoesService.remove(this.excluir.id || 0).subscribe({
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