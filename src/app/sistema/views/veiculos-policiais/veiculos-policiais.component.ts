import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VeiculoPolicial, VeiculosPoliciais } from './veiculo-policial';
import { VeiculosPoliciaisService } from './veiculos-policiais.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosPoliciaisFormComponent } from './formulario/veiculos-policiais-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { VeiculosPoliciaisFormReceberComponent  } from './formulario-receber/veiculos-policiais-form-receber.component';
import { User } from '../users/user';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-veiculos-policiais',
  templateUrl: './veiculos-policiais.component.html',
  styleUrl: './veiculos-policiais.component.css', 
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    VeiculosPoliciaisFormComponent,
    VeiculosPoliciaisFormReceberComponent,
    DataTableModule,
    FormsModule,
    RouterModule
  ],
})
export class VeiculosPoliciaisComponent implements OnInit, OnDestroy {
  protected data$!: VeiculosPoliciais;
  protected excluir!: VeiculoPolicial;
  protected pesquisa!: string;
  protected temp!: VeiculosPoliciais;
  protected quant: number = 10;
  protected subscription: any;
  protected recebveiculo!: VeiculoPolicial;
  protected cadastrando:boolean = false;

  protected user!: User;

  @ViewChild(VeiculosPoliciaisFormComponent) child!: VeiculosPoliciaisFormComponent;

  constructor(
    private veiculosPoliciaisService: VeiculosPoliciaisService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('veiculos_policiais');
    this.user = this.sessionService.getUser();
    this.subscription = this.veiculosPoliciaisService.index().subscribe({
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
    this.veiculosPoliciaisService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }


  editar(data: VeiculoPolicial) {
    this.cadastrando = false;
    setTimeout(() => {
      this.cadastrando = true;
    }, 100);
    setTimeout(() => {
      this.child.editar(data);
    }, 200);
    

  }

  cadastrar(){
    this.cadastrando = false;
    setTimeout(() => {
      this.cadastrando = true;
    }, 100);
    setTimeout(() => {
      this.child.reset();
    }, 200);
  }

  delete(data: VeiculoPolicial) {
    this.excluir = data;
  }

  confirm() {
    this.veiculosPoliciaisService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  receber(data: VeiculoPolicial){
    this.recebveiculo = data;
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data:any) => {
         if(data.veiculo.placa_especial && data.policial.numeral){
          return data.veiculo.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.placa_especial.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.numeral.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || !pesq
         }else if(data.veiculo.placa_especial){
          return data.veiculo.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.placa_especial.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || !pesq
         }else if(data.policial.numeral){
          return data.veiculo.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.numeral.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || !pesq
         }else{
            return data.veiculo.placa.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.veiculo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1
            || !pesq
         }
      });
    }
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}