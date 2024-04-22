import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Armamento, Armamentos } from './armamento';
import { ArmamentosService } from './armamentos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosFormComponent } from './formulario/armamentos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-armamentos',
  templateUrl: './armamentos.component.html',
  styleUrl: './armamentos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ArmamentosComponent implements OnInit, OnDestroy {
  protected data$!: Armamentos;
  protected excluir!: Armamento;
  protected pesquisa!: string;
  protected temp!: Armamentos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ArmamentosFormComponent) child!: ArmamentosFormComponent;

  constructor(
    private armamentosService: ArmamentosService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.armamentosService.index().subscribe({
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
    this.armamentosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Armamento) {
    this.child.editar(data);
  }

  delete(data: Armamento) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosService.remove(this.excluir.id || 0).subscribe({
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
        return data.serial.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.armamento_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.armamento_calibre?.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.armamento_tamanho?.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}