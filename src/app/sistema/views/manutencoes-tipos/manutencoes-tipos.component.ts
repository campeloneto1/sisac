import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManutencaoTipo, ManutencoesTipos } from './manutencao-tipo';
import { ManutencoesTiposService } from './manutencoes-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ManutencoesTiposFormComponent } from './formulario/manutencoes-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-manutencoes-tipos',
  templateUrl: './manutencoes-tipos.component.html',
  styleUrl: './manutencoes-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ManutencoesTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ManutencoesTiposComponent implements OnInit, OnDestroy {
  protected data$!: ManutencoesTipos;
  protected excluir!: ManutencaoTipo;
  protected pesquisa!: string;
  protected temp!: ManutencoesTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ManutencoesTiposFormComponent) child!: ManutencoesTiposFormComponent;

  constructor(
    private manutencoesTiposService: ManutencoesTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.manutencoesTiposService.index().subscribe({
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
    this.manutencoesTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ManutencaoTipo) {
    this.child.editar(data);
  }

  delete(data: ManutencaoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.manutencoesTiposService.remove(this.excluir.id || 0).subscribe({
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