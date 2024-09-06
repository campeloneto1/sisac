import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManutencaoTipo, ManutencoesTipos } from './manutencao-tipo';
import { ManutencoesTiposService } from './manutencoes-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ManutencoesTiposFormComponent } from './formulario/manutencoes-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-manutencoes-tipos',
  templateUrl: './manutencoes-tipos.component.html',
  styleUrl: './manutencoes-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ManutencoesTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ManutencoesTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ManutencoesTipos>;
  protected excluir!: ManutencaoTipo;
  protected pesquisa!: string;
  protected temp!: ManutencoesTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ManutencoesTiposFormComponent) child!: ManutencoesTiposFormComponent;

  constructor(
    private manutencoesTiposService: ManutencoesTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.manutencoesTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.manutencoesTiposService.index();
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

}