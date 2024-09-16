import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisTipos, MaterialTipo } from './material-tipo';
import { MateriaisTiposService } from './materiais-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisTiposFormComponent } from './formulario/materiais-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-materiais-tipos',
  templateUrl: './materiais-tipos.component.html',
  styleUrl: './materiais-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class MateriaisTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<MateriaisTipos>;
  protected excluir!: MaterialTipo;
  protected pesquisa!: string;
  protected temp!: MateriaisTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(MateriaisTiposFormComponent) child!: MateriaisTiposFormComponent;

  constructor(
    private materiaisTiposService: MateriaisTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.materiaisTiposService.index();
  }

  ngOnDestroy(): void {
    
  }

  refresh() {
    this.data$ = this.materiaisTiposService.index();
  }

  editar(data: MaterialTipo) {
    this.child.editar(data);
  }

  delete(data: MaterialTipo) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisTiposService.remove(this.excluir.id || 0).subscribe({
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