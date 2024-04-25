import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PublicacaoTipo, PublicacoesTipos } from './publicacao-tipo';
import { PublicacoesTiposService } from './publicacoes-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PublicacoesTiposFormComponent } from './formulario/publicacoes-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-publicacoes-tipos',
  templateUrl: './publicacoes-tipos.component.html',
  styleUrl: './publicacoes-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PublicacoesTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class PublicacoesTiposComponent implements OnInit, OnDestroy {
  protected data$!: PublicacoesTipos;
  protected excluir!: PublicacaoTipo;
  protected pesquisa!: string;
  protected temp!: PublicacoesTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(PublicacoesTiposFormComponent) child!: PublicacoesTiposFormComponent;

  constructor(
    private publicacoesTiposService: PublicacoesTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.publicacoesTiposService.index().subscribe({
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
    this.publicacoesTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: PublicacaoTipo) {
    this.child.editar(data);
  }

  delete(data: PublicacaoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.publicacoesTiposService.remove(this.excluir.id || 0).subscribe({
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