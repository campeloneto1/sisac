import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContratoTipo, ContratosTipos } from './contrato-tipo';
import { ContratosTiposService } from './contratos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ContratosTiposFormComponent } from './formulario/contratos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-contratos-tipos',
  templateUrl: './contratos-tipos.component.html',
  styleUrl: './contratos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ContratosTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ContratosTiposComponent implements OnInit, OnDestroy {
  protected data$!: ContratosTipos;
  protected excluir!: ContratoTipo;
  protected pesquisa!: string;
  protected temp!: ContratosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ContratosTiposFormComponent) child!: ContratosTiposFormComponent;

  constructor(
    private contratosTiposService: ContratosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.contratosTiposService.index().subscribe({
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
    this.contratosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ContratoTipo) {
    this.child.editar(data);
  }

  delete(data: ContratoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.contratosTiposService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || !pesq
      });
    }
  }

}