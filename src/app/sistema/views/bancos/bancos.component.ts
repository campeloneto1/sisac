import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Banco, Bancos } from './banco';
import { BancosService } from './bancos.service';
import { TitleComponent } from '../../components/title/title.component';
import { BancosFormComponent } from './formulario/bancos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    BancosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class BancosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Bancos>;
  protected excluir!: Banco;
  protected pesquisa!: string;
  protected temp!: Bancos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(BancosFormComponent) child!: BancosFormComponent;

  constructor(
    private bancosService: BancosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.bancosService.index();
  }

  ngOnDestroy(): void {
    
  }

  refresh() {
    this.data$ = this.bancosService.index();
  }

  editar(data: Banco) {
    this.child.editar(data);
  }

  delete(data: Banco) {
    this.excluir = data;
  }

  confirm() {
    this.bancosService.remove(this.excluir.id || 0).subscribe({
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