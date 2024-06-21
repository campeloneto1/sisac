import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Empresa, Empresas } from './empresa';
import { EmpresasService } from './empresas.service';
import { TitleComponent } from '../../components/title/title.component';
import { EmpresasFormComponent } from './formulario/empresas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    EmpresasFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective,
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class EmpresasComponent implements OnInit, OnDestroy {
  protected data$!: Empresas;
  protected excluir!: Empresa;
  protected pesquisa!: string;
  protected temp!: Empresas;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(EmpresasFormComponent) child!: EmpresasFormComponent;

  constructor(
    private empresasService: EmpresasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('empresas');
    this.subscription = this.empresasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
        this.temp = data;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.empresasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
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

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.cnpj.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }    
  }

}