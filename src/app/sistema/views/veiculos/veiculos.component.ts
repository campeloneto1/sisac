import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Veiculo, Veiculos } from './veiculo';
import { VeiculosService } from './veiculos.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosFormComponent } from './formulario/veiculos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    VeiculosFormComponent,
    DataTablesModule,
    FormsModule,
    RouterModule
  ],
})
export class VeiculosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Veiculos>;
  protected excluir!: Veiculo;
  protected pesquisa!: string;
  protected temp!: Veiculos;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(VeiculosFormComponent) child!: VeiculosFormComponent;

  constructor(
    private veiculosService: VeiculosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService,

  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('veiculos');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [6, 'asc']};

    this.data$ = this.veiculosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.veiculosService.index();
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

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}