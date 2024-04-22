import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Graduacao, Graduacoes } from './graduacao';
import { GraduacoesService } from './graduacoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { GraduacoesFormComponent } from './formulario/graduacoes-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrl: './graduacoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    GraduacoesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class GraduacoesComponent implements OnInit, OnDestroy {
  protected data$!: Graduacoes;
  protected excluir!: Graduacao;
  protected pesquisa!: string;
  protected temp!: Graduacoes;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(GraduacoesFormComponent) child!: GraduacoesFormComponent;

  constructor(
    private graduacoesService: GraduacoesService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.graduacoesService.index().subscribe({
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
    this.graduacoesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Graduacao) {
    this.child.editar(data);
  }

  delete(data: Graduacao) {
    this.excluir = data;
  }

  confirm() {
    this.graduacoesService.remove(this.excluir.id || 0).subscribe({
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
        || data.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1
        || !pesq
      });
    }
  }

}