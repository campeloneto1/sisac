import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Pais, Paises } from './pais';
import { PaisesService } from './paises.service';
import { TitleComponent } from '../../components/title/title.component';
import { PaisesFormComponent } from './formulario/paises-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PaisesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class PaisesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Paises>;
  protected excluir!: Pais;
  protected pesquisa!: string;
  protected temp!: Paises;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PaisesFormComponent) child!: PaisesFormComponent;

  constructor(
    private paisesService: PaisesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.paisesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.paisesService.index();
  }

  editar(data: Pais) {
    this.child.editar(data);
  }

  delete(data: Pais) {
    this.excluir = data;
  }

  confirm() {
    this.paisesService.remove(this.excluir.id || 0).subscribe({
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