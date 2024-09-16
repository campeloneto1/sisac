import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cor, Cores } from './cor';
import { CoresService } from './cores.service';
import { TitleComponent } from '../../components/title/title.component';
import { CoresFormComponent } from './formulario/cores-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-cores',
  templateUrl: './cores.component.html',
  styleUrl: './cores.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    CoresFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class CoresComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Cores>;
  protected excluir!: Cor;
  protected pesquisa!: string;
  protected temp!: Cores;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(CoresFormComponent) child!: CoresFormComponent;

  constructor(
    private coresService: CoresService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.coresService.index();
  }

  ngOnDestroy(): void {
    
  }

  refresh() {
    this.data$ = this.coresService.index();
  }

  editar(data: Cor) {
    this.child.editar(data);
  }

  delete(data: Cor) {
    this.excluir = data;
  }

  confirm() {
    this.coresService.remove(this.excluir.id || 0).subscribe({
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