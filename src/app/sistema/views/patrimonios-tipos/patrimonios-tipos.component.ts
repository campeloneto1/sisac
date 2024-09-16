import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PatrimonioTipo, PatrimoniosTipos } from './patrimonio-tipo';
import { PatrimoniosTiposService } from './patrimonios-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PatrimoniosTiposFormComponent } from './formulario/patrimonios-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-patrimonios-tipos',
  templateUrl: './patrimonios-tipos.component.html',
  styleUrl: './patrimonios-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PatrimoniosTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ManutencoesTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PatrimoniosTipos>;
  protected excluir!: PatrimonioTipo;
  protected pesquisa!: string;
  protected temp!: PatrimoniosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PatrimoniosTiposFormComponent) child!: PatrimoniosTiposFormComponent;

  constructor(
    private patrimoniosTiposService: PatrimoniosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.patrimoniosTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.patrimoniosTiposService.index();
  }

  editar(data: PatrimonioTipo) {
    this.child.editar(data);
  }

  delete(data: PatrimonioTipo) {
    this.excluir = data;
  }

  confirm() {
    this.patrimoniosTiposService.remove(this.excluir.id || 0).subscribe({
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