import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumoTipos, MaterialConsumoTipo } from './material-consumo-tipo';
import { MateriaisConsumoTiposService } from './materiais-consumo-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoTiposFormComponent } from './formulario/materiais-consumo-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-materiais-consumo-tipos',
  templateUrl: './materiais-consumo-tipos.component.html',
  styleUrl: './materiais-consumo-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisConsumoTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class MateriaisConsumoTiposComponent implements OnInit, OnDestroy {
  protected data$!: MateriaisConsumoTipos;
  protected excluir!: MaterialConsumoTipo;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumoTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(MateriaisConsumoTiposFormComponent) child!: MateriaisConsumoTiposFormComponent;

  constructor(
    private materiaisConsumoTiposService: MateriaisConsumoTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.materiaisConsumoTiposService.index().subscribe({
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
    this.materiaisConsumoTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: MaterialConsumoTipo) {
    this.child.editar(data);
  }

  delete(data: MaterialConsumoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisConsumoTiposService.remove(this.excluir.id || 0).subscribe({
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