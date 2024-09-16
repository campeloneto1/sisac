import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContratoTipo, ContratosTipos } from './contrato-tipo';
import { ContratosTiposService } from './contratos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ContratosTiposFormComponent } from './formulario/contratos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-contratos-tipos',
  templateUrl: './contratos-tipos.component.html',
  styleUrl: './contratos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ContratosTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ContratosTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ContratosTipos>;
  protected excluir!: ContratoTipo;
  protected pesquisa!: string;
  protected temp!: ContratosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ContratosTiposFormComponent) child!: ContratosTiposFormComponent;

  constructor(
    private contratosTiposService: ContratosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.contratosTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.contratosTiposService.index();
  }

  editar(data: ContratoTipo) {
    this.child.editar(data);
  }

  delete(data: ContratoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.contratosTiposService.remove(this.excluir.id || 0).subscribe({
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