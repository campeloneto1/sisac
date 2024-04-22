import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sexo, Sexos } from './sexo';
import { SexosService } from './sexos.service';
import { TitleComponent } from '../../components/title/title.component';
import { SexosFormComponent } from './formulario/sexos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sexos',
  templateUrl: './sexos.component.html',
  styleUrl: './sexos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SexosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class SexosComponent implements OnInit, OnDestroy {
  protected data$!: Sexos;
  protected excluir!: Sexo;
  protected pesquisa!: string;
  protected temp!: Sexos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(SexosFormComponent) child!: SexosFormComponent;

  constructor(
    private sexosService: SexosService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.sexosService.index().subscribe({
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
    this.sexosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Sexo) {
    this.child.editar(data);
  }

  delete(data: Sexo) {
    this.excluir = data;
  }

  confirm() {
    this.sexosService.remove(this.excluir.id || 0).subscribe({
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
   
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || !pesq
      });
    }else{
      this.data$ = this.temp;
    }
    
  }

}