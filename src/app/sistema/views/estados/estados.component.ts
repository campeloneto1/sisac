import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Estado, Estados } from './estado';
import { EstadosService } from './estados.service';
import { TitleComponent } from '../../components/title/title.component';
import { EstadosFormComponent } from './formulario/estados-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    EstadosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class EstadosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Estados>;
  protected excluir!: Estado;
  protected pesquisa!: string;
  protected temp!: Estados;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(EstadosFormComponent) child!: EstadosFormComponent;

  constructor(
    private estadosService: EstadosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [2, 'asc']
    };

    this.data$ = this.estadosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.estadosService.index();
  }

  editar(data: Estado) {
    this.child.editar(data);
  }

  delete(data: Estado) {
    this.excluir = data;
  }

  confirm() {
    this.estadosService.remove(this.excluir.id || 0).subscribe({
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