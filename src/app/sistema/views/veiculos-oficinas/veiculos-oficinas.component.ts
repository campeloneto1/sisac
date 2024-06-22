import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VeiculoOficina, VeiculosOficinas } from './veiculo-oficina';
import { VeiculosOficinasService } from './veiculos-oficinas.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosOficinasFormComponent } from './formulario/veiculos-oficinas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { VeiculosOficinasFormReceberComponent } from './formulario-receber/veiculos-oficinas-form-receber.component';
import { User } from '../users/user';
@Component({
  selector: 'app-veiculos-oficinas',
  templateUrl: './veiculos-oficinas.component.html',
  styleUrl: './veiculos-oficinas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    VeiculosOficinasFormComponent,
    VeiculosOficinasFormReceberComponent,
    DataTableModule,
    FormsModule
  ],
})
export class VeiculosOficinasComponent implements OnInit, OnDestroy {
  protected data$!: VeiculosOficinas;
  protected excluir!: VeiculoOficina;
  protected pesquisa!: string;
  protected temp!: VeiculosOficinas;
  protected quant: number = 10;
  protected subscription: any;
  protected recebveiculo!: VeiculoOficina;

  protected user!: User;

  @ViewChild(VeiculosOficinasFormComponent) child!: VeiculosOficinasFormComponent;

  constructor(
    private veiculosOficinasService: VeiculosOficinasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('veiculos_oficinas');
    this.user = this.sessionService.getUser();
    this.subscription = this.veiculosOficinasService.index().subscribe({
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
    this.veiculosOficinasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: VeiculoOficina) {
    this.child.editar(data);
  }

  delete(data: VeiculoOficina) {
    this.excluir = data;
  }

  confirm() {
    this.veiculosOficinasService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  receber(data: VeiculoOficina){
    this.recebveiculo = data;
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        if(data.veiculo.placa_especial){
            return data.veiculo.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.placa_especial.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.oficina.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.manutencao_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || !pesq
        }else{
            return data.veiculo.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.oficina.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.manutencao_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || !pesq
        }
        
      });
    }
  }

}