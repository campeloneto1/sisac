import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Unidade, Unidades } from './unidade';
import { UnidadesService } from './unidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { UnidadesFormComponent } from './formulario/unidades-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    UnidadesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class UnidadesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Unidades>;
  protected excluir!: Unidade;
  protected pesquisa!: string;
  protected temp!: Unidades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(UnidadesFormComponent) child!: UnidadesFormComponent;

  constructor(
    private unidadesService: UnidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.unidadesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.unidadesService.index();
  }

  editar(data: Unidade) {
    this.child.editar(data);
  }

  delete(data: Unidade) {
    this.excluir = data;
  }

  confirm() {
    this.unidadesService.remove(this.excluir.id || 0).subscribe({
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