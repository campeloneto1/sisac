import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumoTipos, MaterialConsumoTipo } from './material-consumo-tipo';
import { MateriaisConsumoTiposService } from './materiais-consumo-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoTiposFormComponent } from './formulario/materiais-consumo-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-materiais-consumo-tipos',
  templateUrl: './materiais-consumo-tipos.component.html',
  styleUrl: './materiais-consumo-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisConsumoTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class MateriaisConsumoTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<MateriaisConsumoTipos>;
  protected excluir!: MaterialConsumoTipo;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumoTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(MateriaisConsumoTiposFormComponent) child!: MateriaisConsumoTiposFormComponent;

  constructor(
    private materiaisConsumoTiposService: MateriaisConsumoTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.materiaisConsumoTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.materiaisConsumoTiposService.index();
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

}