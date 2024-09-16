import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Escolaridade, Escolaridades } from './escolaridade';
import { EscolaridadesService } from './escolaridades.service';
import { TitleComponent } from '../../components/title/title.component';
import { EscolaridadesFormComponent } from './formulario/escolaridades-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-escolaridades',
  templateUrl: './escolaridades.component.html',
  styleUrl: './escolaridades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    EscolaridadesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class EscolaridadesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Escolaridades>;
  protected excluir!: Escolaridade;
  protected pesquisa!: string;
  protected temp!: Escolaridades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(EscolaridadesFormComponent) child!: EscolaridadesFormComponent;

  constructor(
    private escolaridadesService: EscolaridadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.escolaridadesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.escolaridadesService.index();
  }

  editar(data: Escolaridade) {
    this.child.editar(data);
  }

  delete(data: Escolaridade) {
    this.excluir = data;
  }

  confirm() {
    this.escolaridadesService.remove(this.excluir.id || 0).subscribe({
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