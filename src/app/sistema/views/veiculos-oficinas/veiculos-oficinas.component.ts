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
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
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
    DataTablesModule,
    FormsModule
  ],
})
export class VeiculosOficinasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<VeiculosOficinas>;
  protected excluir!: VeiculoOficina;
  protected pesquisa!: string;
  protected temp!: VeiculosOficinas;
  protected quant: number = 10;
  protected subscription: any;
  protected recebveiculo!: VeiculoOficina;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(VeiculosOficinasFormComponent) child!: VeiculosOficinasFormComponent;

  constructor(
    private veiculosOficinasService: VeiculosOficinasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('veiculos_oficinas');
    this.user = this.sessionService.getUser();
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.veiculosOficinasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.veiculosOficinasService.index();
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

}