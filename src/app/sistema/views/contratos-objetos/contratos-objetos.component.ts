import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContratoObjeto, ContratosObjetos } from './contrato-objeto';
import { ContratosObjetosService } from './contratos-objetos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ContratosObjetosFormComponent } from './formulario/contratos-objetos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-contratos-objetos',
  templateUrl: './contratos-objetos.component.html',
  styleUrl: './contratos-objetos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ContratosObjetosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ContratosObjetosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ContratosObjetos>;
  protected excluir!: ContratoObjeto;
  protected pesquisa!: string;
  protected temp!: ContratosObjetos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ContratosObjetosFormComponent) child!: ContratosObjetosFormComponent;

  constructor(
    private contratosObjetosService: ContratosObjetosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.contratosObjetosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.contratosObjetosService.index();
  }

  editar(data: ContratoObjeto) {
    this.child.editar(data);
  }

  delete(data: ContratoObjeto) {
    this.excluir = data;
  }

  confirm() {
    this.contratosObjetosService.remove(this.excluir.id || 0).subscribe({
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