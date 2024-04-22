import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoTamanho, ArmamentosTamanhos } from './armamento-tamanho';
import { ArmamentosTamanhosService } from './armamentos-tamanhos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosTamanhosFormComponent } from './formulario/armamentos-tamanhos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-armamentos-tamanhos',
  templateUrl: './armamentos-tamanhos.component.html',
  styleUrl: './armamentos-tamanhos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosTamanhosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ArmamentosTamanhosComponent implements OnInit, OnDestroy {
  protected data$!: ArmamentosTamanhos;
  protected excluir!: ArmamentoTamanho;
  protected pesquisa!: string;
  protected temp!: ArmamentosTamanhos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ArmamentosTamanhosFormComponent) child!: ArmamentosTamanhosFormComponent;

  constructor(
    private armamentosTamanhosService: ArmamentosTamanhosService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.armamentosTamanhosService.index().subscribe({
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
    this.armamentosTamanhosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: ArmamentoTamanho) {
    this.child.editar(data);
  }

  delete(data: ArmamentoTamanho) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosTamanhosService.remove(this.excluir.id || 0).subscribe({
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