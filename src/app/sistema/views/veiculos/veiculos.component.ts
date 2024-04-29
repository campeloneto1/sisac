import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Veiculo, Veiculos } from './veiculo';
import { VeiculosService } from './veiculos.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosFormComponent } from './formulario/veiculos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    VeiculosFormComponent,
    DataTableModule,
    FormsModule,
    RouterModule
  ],
})
export class VeiculosComponent implements OnInit, OnDestroy {
  protected data$!: Veiculos;
  protected excluir!: Veiculo;
  protected pesquisa!: string;
  protected temp!: Veiculos;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(VeiculosFormComponent) child!: VeiculosFormComponent;

  constructor(
    private veiculosService: VeiculosService,
    private toastr: ToastrService,
    private sessionService: SessionService,

  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('veiculos');
    this.subscription = this.veiculosService.index().subscribe({
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
    this.veiculosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Veiculo) {
    this.child.editar(data);
  }

  delete(data: Veiculo) {
    this.excluir = data;
  }

  confirm() {
    this.veiculosService.remove(this.excluir.id || 0).subscribe({
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
        if(data.placa_especial){
            return data.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.placa_especial.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }else{
            return data.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }
       
      });
    }
  }

}