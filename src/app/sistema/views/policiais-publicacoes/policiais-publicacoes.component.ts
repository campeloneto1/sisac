import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisPublicacoes, PolicialPublicacao} from './policial-publicacao';
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisPublicacoesFormComponent } from './formulario/policiais-publicacoes-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-policiais-publicacoes',
  templateUrl: './policiais-publicacoes.component.html',
  styleUrl: './policiais-publicacoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisPublicacoesFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisPublicacoesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PoliciaisPublicacoes>;
  protected excluir!: PolicialPublicacao;
  protected pesquisa!: string;
  protected temp!: PoliciaisPublicacoes;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisPublicacoesFormComponent) child!: PoliciaisPublicacoesFormComponent;

  constructor(
    private policiaisPublicacoesService: PoliciaisPublicacoesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_publicacoes');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.policiaisPublicacoesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisPublicacoesService.index();
  }

  editar(data: PolicialPublicacao) {
    this.child.editar(data);
  }

  delete(data: PolicialPublicacao) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisPublicacoesService.remove(this.excluir.id || 0).subscribe({
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