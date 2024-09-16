import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Modelo, Modelos } from './modelo';
import { ModelosService } from './modelos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ModelosFormComponent } from './formulario/modelos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ModelosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ModelosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Modelos>;
  protected excluir!: Modelo;
  protected pesquisa!: string;
  protected temp!: Modelos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ModelosFormComponent) child!: ModelosFormComponent;

  constructor(
    private modelosService: ModelosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.modelosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.modelosService.index();
  }

  editar(data: Modelo) {
    this.child.editar(data);
  }

  delete(data: Modelo) {
    this.excluir = data;
  }

  confirm() {
    this.modelosService.remove(this.excluir.id || 0).subscribe({
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