import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Empresa, Empresas } from './empresa';
import { EmpresasService } from './empresas.service';
import { TitleComponent } from '../../components/title/title.component';
import { EmpresasFormComponent } from './formulario/empresas-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    EmpresasFormComponent,
    DataTablesModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective,
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class EmpresasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Empresas>;
  protected excluir!: Empresa;
  protected pesquisa!: string;
  protected temp!: Empresas;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(EmpresasFormComponent) child!: EmpresasFormComponent;

  constructor(
    private empresasService: EmpresasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('empresas');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.empresasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.empresasService.index();
  }

  editar(data: Empresa) {
    this.child.editar(data);
  }

  delete(data: Empresa) {
    this.excluir = data;
  }

  confirm() {
    this.empresasService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }
}