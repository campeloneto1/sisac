import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisAtestados, PolicialAtestado} from './policial-atestado';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisAtestadosFormComponent } from './formulario/policiais-atestados-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-policiais-atestados',
  templateUrl: './policiais-atestados.component.html',
  styleUrl: './policiais-atestados.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisAtestadosFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisAtestadosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PoliciaisAtestados>;
  protected excluir!: PolicialAtestado;
  protected pesquisa!: string;
  protected temp!: PoliciaisAtestados;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisAtestadosFormComponent) child!: PoliciaisAtestadosFormComponent;

  constructor(
    private policiaisAtestadosService: PoliciaisAtestadosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_atestados');
    this.dtOptions = {
      pageLength: 10,
      order: [0, 'desc']
    };

    this.data$ = this.policiaisAtestadosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisAtestadosService.index();
  }

  editar(data: PolicialAtestado) {
    this.child.editar(data);
  }

  delete(data: PolicialAtestado) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisAtestadosService.remove(this.excluir.id || 0).subscribe({
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