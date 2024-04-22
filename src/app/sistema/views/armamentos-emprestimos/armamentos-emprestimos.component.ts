import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoEmprestimo, ArmamentosEmprestimos } from './armamento-emprestimo';
import { ArmamentosEmprestimosService } from './armamentos-emprestimos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosEmprestimosFormComponent } from './formulario/armamentos-emprestimos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-armamentos-emprestimos',
  templateUrl: './armamentos-emprestimos.component.html',
  styleUrl: './armamentos-emprestimos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosEmprestimosFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class ArmamentosEmprestimosComponent implements OnInit, OnDestroy {
  protected data$!: ArmamentosEmprestimos;
  protected excluir!: ArmamentoEmprestimo;
  protected pesquisa!: string;
  protected temp!: ArmamentosEmprestimos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ArmamentosEmprestimosFormComponent) child!: ArmamentosEmprestimosFormComponent;

  constructor(
    private armamentosEmprestimosService: ArmamentosEmprestimosService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.armamentosEmprestimosService.index().subscribe({
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
    this.armamentosEmprestimosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ArmamentoEmprestimo) {
    this.child.editar(data);
  }

  delete(data: ArmamentoEmprestimo) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosEmprestimosService.remove(this.excluir.id || 0).subscribe({
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
        return data.policial.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1         
        || !pesq
      });
    }
  }

}