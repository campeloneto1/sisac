import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VeiculoTipo, VeiculosTipos} from './veiculo-tipo';
import { VeiculosTiposService } from './veiculos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosTiposFormComponent } from './formulario/veiculos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-veiculos-tipos',
  templateUrl: './veiculos-tipos.component.html',
  styleUrl: './veiculos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    VeiculosTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class VeiculosTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<VeiculosTipos>;
  protected excluir!: VeiculoTipo;
  protected pesquisa!: string;
  protected temp!: VeiculosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(VeiculosTiposFormComponent) child!: VeiculosTiposFormComponent;

  constructor(
    private veiculosTiposService: VeiculosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.veiculosTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.veiculosTiposService.index();
  }

  editar(data: VeiculoTipo) {
    this.child.editar(data);
  }

  delete(data: VeiculoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.veiculosTiposService.remove(this.excluir.id || 0).subscribe({
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