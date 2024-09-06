import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisRequeridas, PolicialRequerida} from './policial-requerida';
import { PoliciaisRequeridasService } from './policiais-requeridas.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisRequeridasFormComponent } from './formulario/policiais-requeridas-form.component';
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
  selector: 'app-policiais-requeridas',
  templateUrl: './policiais-requeridas.component.html',
  styleUrl: './policiais-requeridas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisRequeridasFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisRequeridasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PoliciaisRequeridas>;
  protected excluir!: PolicialRequerida;
  protected pesquisa!: string;
  protected temp!: PoliciaisRequeridas;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisRequeridasFormComponent) child!: PoliciaisRequeridasFormComponent;

  constructor(
    private PoliciaisRequeridasService: PoliciaisRequeridasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_requeridas');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.PoliciaisRequeridasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ =  this.PoliciaisRequeridasService.index();
  }

  editar(data: PolicialRequerida) {
    this.child.editar(data);
  }

  delete(data: PolicialRequerida) {
    this.excluir = data;
  }

  confirm() {
    this.PoliciaisRequeridasService.remove(this.excluir.id || 0).subscribe({
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