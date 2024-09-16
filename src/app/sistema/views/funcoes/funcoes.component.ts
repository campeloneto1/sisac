import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Funcao, Funcoes } from './funcao';
import { FuncoesService } from './funcoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { FuncoesFormComponent } from './formulario/funcoes-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.component.html',
  styleUrl: './funcoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    FuncoesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class FuncoesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Funcoes>;
  protected excluir!: Funcao;
  protected pesquisa!: string;
  protected temp!: Funcoes;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(FuncoesFormComponent) child!: FuncoesFormComponent;

  constructor(
    private funcoesService: FuncoesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('gestor');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.funcoesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.funcoesService.index();
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

}