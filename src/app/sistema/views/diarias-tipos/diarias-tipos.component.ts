import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DiariaTipo, DiariasTipos} from './diaria-tipo';
import { DiariasTiposService } from './diarias-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { DiariasTiposFormComponent } from './formulario/diarias-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-diarias-tipos',
  templateUrl: './diarias-tipos.component.html',
  styleUrl: './diarias-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    DiariasTiposFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class DiariasTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<DiariasTipos>;
  protected excluir!: DiariaTipo;
  protected pesquisa!: string;
  protected temp!: DiariasTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(DiariasTiposFormComponent) child!: DiariasTiposFormComponent;

  constructor(
    private diariasTiposService: DiariasTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.diariasTiposService.index();
  }

  ngOnDestroy(): void {
    
  }

  refresh() {
    this.data$ = this.diariasTiposService.index();
  }

  editar(data: DiariaTipo) {
    this.child.editar(data);
  }

  delete(data: DiariaTipo) {
    this.excluir = data;
  }

  confirm() {
    this.diariasTiposService.remove(this.excluir.id || 0).subscribe({
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