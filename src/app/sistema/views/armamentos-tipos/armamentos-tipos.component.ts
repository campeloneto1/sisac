import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoTipo, ArmamentosTipos } from './armamento-tipo';
import { ArmamentosTiposService } from './armamentos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosTiposFormComponent } from './formulario/armamentos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-armamentos-tipos',
  templateUrl: './armamentos-tipos.component.html',
  styleUrl: './armamentos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ArmamentosTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ArmamentosTipos>;
  protected excluir!: ArmamentoTipo;
  protected pesquisa!: string;
  protected temp!: ArmamentosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ArmamentosTiposFormComponent) child!: ArmamentosTiposFormComponent;

  constructor(
    private armamentosTiposService: ArmamentosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };
    this.data$ = this.armamentosTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.armamentosTiposService.index();
  }

  editar(data: ArmamentoTipo) {
    this.child.editar(data);
  }

  delete(data: ArmamentoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosTiposService.remove(this.excluir.id || 0).subscribe({
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