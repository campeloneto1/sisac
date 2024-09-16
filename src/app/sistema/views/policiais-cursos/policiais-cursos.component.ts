import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisCursos, PolicialCurso } from './policial-curso';
import { PoliciaisCursosService } from './policiais-cursos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisCursosFormComponent } from './formulario/policiais-cursos-form.component';
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
  selector: 'app-policiais-cursos',
  templateUrl: './policiais-cursos.component.html',
  styleUrl: './policiais-cursos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisCursosFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisCursosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PoliciaisCursos>;
  protected excluir!: PolicialCurso;
  protected pesquisa!: string;
  protected temp!: PoliciaisCursos;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisCursosFormComponent) child!: PoliciaisCursosFormComponent;

  constructor(
    private policiaisCursosService: PoliciaisCursosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_cursos');
    this.dtOptions = {
      pageLength: 10,
      order: [0, 'desc']
    };

    this.data$ = this.policiaisCursosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisCursosService.index();
  }

  editar(data: PolicialCurso) {
    this.child.editar(data);
  }

  delete(data: PolicialCurso) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisCursosService.remove(this.excluir.id || 0).subscribe({
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