import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DiariaStatus, DiariasStatus } from './diaria-status';
import { DiariasStatusService } from './diarias-status.service';
import { TitleComponent } from '../../components/title/title.component';
import { DiariasStatusFormComponent } from './formulario/diarias-status-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-diarias-status',
  templateUrl: './diarias-status.component.html',
  styleUrl: './diarias-status.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    DiariasStatusFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class DiariasStatusComponent implements OnInit, OnDestroy {
  protected data$!: Observable<DiariasStatus>;
  protected excluir!: DiariaStatus;
  protected pesquisa!: string;
  protected temp!: DiariasStatus;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(DiariasStatusFormComponent) child!: DiariasStatusFormComponent;

  constructor(
    private diariasStatusService: DiariasStatusService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.diariasStatusService.index();
  }

  ngOnDestroy(): void {
    
  }

  refresh() {
    this.data$ = this.diariasStatusService.index();
  }

  editar(data: DiariaStatus) {
    this.child.editar(data);
  }

  delete(data: DiariaStatus) {
    this.excluir = data;
  }

  confirm() {
    this.diariasStatusService.remove(this.excluir.id || 0).subscribe({
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