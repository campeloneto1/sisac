import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VeiculoTipo, VeiculosTipos} from './veiculo-tipo';
import { VeiculosTiposService } from './veiculos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosTiposFormComponent } from './formulario/veiculos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-veiculos-tipos',
  templateUrl: './veiculos-tipos.component.html',
  styleUrl: './veiculos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    VeiculosTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class VeiculosTiposComponent implements OnInit, OnDestroy {
  protected data$!: VeiculosTipos;
  protected excluir!: VeiculoTipo;
  protected pesquisa!: string;
  protected temp!: VeiculosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(VeiculosTiposFormComponent) child!: VeiculosTiposFormComponent;

  constructor(
    private veiculosTiposService: VeiculosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.veiculosTiposService.index().subscribe({
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
    this.veiculosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: VeiculoTipo) {
    this.child.editar(data);
  }

  delete(data: VeiculoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.veiculosTiposService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || !pesq
      });
    }
  }

}