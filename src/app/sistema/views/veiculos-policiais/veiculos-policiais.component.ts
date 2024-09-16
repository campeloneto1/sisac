import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VeiculoPolicial, VeiculosPoliciais } from './veiculo-policial';
import { VeiculosPoliciaisService } from './veiculos-policiais.service';
import { TitleComponent } from '../../components/title/title.component';
import { VeiculosPoliciaisFormComponent } from './formulario/veiculos-policiais-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { VeiculosPoliciaisFormReceberComponent  } from './formulario-receber/veiculos-policiais-form-receber.component';
import { User } from '../users/user';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { VeiculosPoliciaisShow } from './show/veiculos-policiais-show.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
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
    VeiculosPoliciaisShow,
    DataTablesModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective, 
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
]
})
export class VeiculosPoliciaisComponent implements OnInit, OnDestroy {
  protected data$!: Observable<VeiculosPoliciais>;
  protected excluir!: VeiculoPolicial;
  protected pesquisa!: string;
  protected temp!: VeiculosPoliciais;
  protected quant: number = 10;
  protected subscription: any;
  protected recebveiculo!: VeiculoPolicial;
  protected cadastrando:boolean = false;
  protected emprestado!: VeiculoPolicial;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

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
    this.dtOptions = {
      pageLength: 10,
      order: [0, 'desc']
    };

    this.data$ = this.veiculosPoliciaisService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.veiculosPoliciaisService.index();
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

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

  showEmprestimo(data: VeiculoPolicial){
    this.emprestado = data;
  }

}