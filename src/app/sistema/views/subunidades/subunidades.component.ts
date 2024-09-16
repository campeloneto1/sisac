import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subunidade, Subunidades } from './subunidade';
import { SubunidadesService } from './subunidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { SubunidadesFormComponent } from './formulario/subunidades-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-subunidades',
  templateUrl: './subunidades.component.html',
  styleUrl: './subunidades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SubunidadesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class SubunidadesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Subunidades>;
  protected excluir!: Subunidade;
  protected pesquisa!: string;
  protected temp!: Subunidades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(SubunidadesFormComponent) child!: SubunidadesFormComponent;

  constructor(
    private subunidadesService: SubunidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [2, 'asc']
    };

    this.data$ = this.subunidadesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.subunidadesService.index();
  }

  editar(data: Subunidade) {
    this.child.editar(data);
  }

  delete(data: Subunidade) {
    this.excluir = data;
  }

  confirm() {
    this.subunidadesService.remove(this.excluir.id || 0).subscribe({
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