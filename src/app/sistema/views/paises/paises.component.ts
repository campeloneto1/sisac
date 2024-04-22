import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Pais, Paises } from './pais';
import { PaisesService } from './paises.service';
import { TitleComponent } from '../../components/title/title.component';
import { PaisesFormComponent } from './formulario/paises-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PaisesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class PaisesComponent implements OnInit, OnDestroy {
  protected data$!: Paises;
  protected excluir!: Pais;
  protected pesquisa!: string;
  protected temp!: Paises;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(PaisesFormComponent) child!: PaisesFormComponent;

  constructor(
    private paisesService: PaisesService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.paisesService.index().subscribe({
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
    this.paisesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Pais) {
    this.child.editar(data);
  }

  delete(data: Pais) {
    this.excluir = data;
  }

  confirm() {
    this.paisesService.remove(this.excluir.id || 0).subscribe({
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
        || data.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1
        || !pesq
      });
    }
  }

}