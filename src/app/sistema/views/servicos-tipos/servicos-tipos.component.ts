import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicoTipo, ServicosTipos } from './servico-tipo';
import { ServicosTiposService } from './servicos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ServicosTiposFormComponent } from './formulario/servicos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-servicos-tipos',
  templateUrl: './servicos-tipos.component.html',
  styleUrl: './servicos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ServicosTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ServicosTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ServicosTipos>;
  protected excluir!: ServicoTipo;
  protected pesquisa!: string;
  protected temp!: ServicosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ServicosTiposFormComponent) child!: ServicosTiposFormComponent;

  constructor(
    private servicosTiposService: ServicosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.subscription = this.servicosTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.servicosTiposService.index();
  }

  editar(data: ServicoTipo) {
    this.child.editar(data);
  }

  delete(data: ServicoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.servicosTiposService.remove(this.excluir.id || 0).subscribe({
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