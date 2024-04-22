import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Modelo, Modelos } from './modelo';
import { ModelosService } from './modelos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ModelosFormComponent } from './formulario/modelos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ModelosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ModelosComponent implements OnInit, OnDestroy {
  protected data$!: Modelos;
  protected excluir!: Modelo;
  protected pesquisa!: string;
  protected temp!: Modelos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(ModelosFormComponent) child!: ModelosFormComponent;

  constructor(
    private modelosService: ModelosService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.modelosService.index().subscribe({
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
    this.modelosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Modelo) {
    this.child.editar(data);
  }

  delete(data: Modelo) {
    this.excluir = data;
  }

  confirm() {
    this.modelosService.remove(this.excluir.id || 0).subscribe({
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
        || data.abreviatura?.toLocaleLowerCase().indexOf(pesq) !== -1
        || data.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1
        || data.marca.abreviatura?.toLocaleLowerCase().indexOf(pesq) !== -1
        || !pesq
      });
    }
  }

}