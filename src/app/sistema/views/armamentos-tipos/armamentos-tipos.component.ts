import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoTipo, ArmamentosTipos } from './armamento-tipo';
import { ArmamentosTiposService } from './armamentos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosTiposFormComponent } from './formulario/armamentos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-armamentos-tipos',
  templateUrl: './armamentos-tipos.component.html',
  styleUrl: './armamentos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ArmamentosTiposComponent implements OnInit, OnDestroy {
  protected data$!: ArmamentosTipos;
  protected excluir!: ArmamentoTipo;
  protected pesquisa!: string;
  protected temp!: ArmamentosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ArmamentosTiposFormComponent) child!: ArmamentosTiposFormComponent;

  constructor(
    private armamentosTiposService: ArmamentosTiposService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.armamentosTiposService.index().subscribe({
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
    this.armamentosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ArmamentoTipo) {
    this.child.editar(data);
  }

  delete(data: ArmamentoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosTiposService.remove(this.excluir.id || 0).subscribe({
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
        || !pesq
      });
    }
  }

}