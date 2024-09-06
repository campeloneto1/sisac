import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Oficina, Oficinas } from './oficina';
import { OficinasService } from './oficinas.service';
import { TitleComponent } from '../../components/title/title.component';
import { OficinasFormComponent } from './formulario/oficinas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrl: './oficinas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    OficinasFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class OficinasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Oficinas>;
  protected excluir!: Oficina;
  protected pesquisa!: string;
  protected temp!: Oficinas;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(OficinasFormComponent) child!: OficinasFormComponent;

  constructor(
    private oficinasService: OficinasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('gestor');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.oficinasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.oficinasService.index();
  }

  editar(data: Oficina) {
    this.child.editar(data);
  }

  delete(data: Oficina) {
    this.excluir = data;
  }

  confirm() {
    this.oficinasService.remove(this.excluir.id || 0).subscribe({
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