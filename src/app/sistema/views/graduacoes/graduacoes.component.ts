import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Graduacao, Graduacoes } from './graduacao';
import { GraduacoesService } from './graduacoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { GraduacoesFormComponent } from './formulario/graduacoes-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrl: './graduacoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    GraduacoesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class GraduacoesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Graduacoes>;
  protected excluir!: Graduacao;
  protected pesquisa!: string;
  protected temp!: Graduacoes;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(GraduacoesFormComponent) child!: GraduacoesFormComponent;

  constructor(
    private graduacoesService: GraduacoesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.graduacoesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.graduacoesService.index();
  }

  editar(data: Graduacao) {
    this.child.editar(data);
  }

  delete(data: Graduacao) {
    this.excluir = data;
  }

  confirm() {
    this.graduacoesService.remove(this.excluir.id || 0).subscribe({
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