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
import { ArmamentosEmprestimosItensService } from '../armamentos-emprestimos-itens/armamentos-emprestimos-itens.service';
import { ArmamentosEmprestimosItensFormComponent } from '../armamentos-emprestimos-itens/formulario/armamentos-emprestimos-itens-form.component';
@Component({
  selector: 'app-armamentos-emprestimos',
  templateUrl: './armamentos-emprestimos.component.html',
  styleUrl: './armamentos-emprestimos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosEmprestimosFormComponent,
    ArmamentosEmprestimosItensFormComponent,
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
  protected armamentoEmprestimo!: ArmamentoEmprestimo;

  protected cadarmamento:boolean = false;

  @ViewChild(ArmamentosEmprestimosFormComponent) child!: ArmamentosEmprestimosFormComponent;
  @ViewChild(ArmamentosEmprestimosItensFormComponent) childarmamento!: ArmamentosEmprestimosItensFormComponent;

  constructor(
    private armamentosEmprestimosService: ArmamentosEmprestimosService,
    private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService,
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

  showArms(data: ArmamentoEmprestimo){
    this.cadarmamento = false;
    this.armamentosEmprestimosService.find(data.id || 0).subscribe({
      next: (data) => {
        this.armamentoEmprestimo = data;
      }
    })
    
  }

  refreshArms(){
    this.cadarmamento = false;
    this.armamentosEmprestimosService.find(this.armamentoEmprestimo.id || 0).subscribe({
      next: (data) => {
        this.armamentoEmprestimo = data;
      }
    });
  }

  rmvArmamento(id: number){
    if(window.confirm("Tem certeza que deseja excluir o armamento?")){
      this.armamentosEmprestimosItensService.remove(id).subscribe({
        next: (data) => {
          this.armamentosEmprestimosService.find(this.armamentoEmprestimo.id || 0).subscribe({
            next: (data) => {
              this.armamentoEmprestimo = data;
            }
          });
        }
      });
    }
   
  }

  cancelArm(){
    this.cadarmamento = false;
  }

}