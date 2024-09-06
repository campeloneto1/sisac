import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoEmprestimo, ArmamentosEmprestimos } from './armamento-emprestimo';
import { ArmamentosEmprestimosService } from './armamentos-emprestimos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosEmprestimosFormComponent } from './formulario/armamentos-emprestimos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ArmamentosEmprestimosItensService } from '../armamentos-emprestimos-itens/armamentos-emprestimos-itens.service';
import { ArmamentosEmprestimosItensFormComponent } from '../armamentos-emprestimos-itens/formulario/armamentos-emprestimos-itens-form.component';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';
import { ArmamentosEmprestimosFormReceberComponent } from './formulario-receber/armamentos-emprestimos-form-receber.component';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ArmamentosEmprestimosShow } from './show/armamentos-emprestimos-show.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-armamentos-emprestimos',
  templateUrl: './armamentos-emprestimos.component.html',
  styleUrl: './armamentos-emprestimos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosEmprestimosFormComponent,
    ArmamentosEmprestimosFormReceberComponent,
    ArmamentosEmprestimosItensFormComponent,
    ArmamentosEmprestimosShow,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    InputTextareaComponent,
    RouterModule
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class ArmamentosEmprestimosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ArmamentosEmprestimos>;
  protected excluir!: ArmamentoEmprestimo;
  protected pesquisa!: string;
  protected temp!: ArmamentosEmprestimos;
  protected quant: number = 10;
  protected subscription: any;
  protected armamentoEmprestimo!: ArmamentoEmprestimo;

  protected cadastrando: boolean = false;

  protected cadarmamento:boolean = false;

  protected emprestado!: ArmamentoEmprestimo;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ArmamentosEmprestimosFormComponent) child!: ArmamentosEmprestimosFormComponent;
  @ViewChild(ArmamentosEmprestimosFormReceberComponent) childreceber!: ArmamentosEmprestimosFormReceberComponent;
  @ViewChild(ArmamentosEmprestimosItensFormComponent) childarmamento!: ArmamentosEmprestimosItensFormComponent;

  constructor(
    private armamentosEmprestimosService: ArmamentosEmprestimosService,
    private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
    
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('armamentos_emprestimos');
    this.data$ = this.armamentosEmprestimosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.armamentosEmprestimosService.index();
  }

  editar(data: ArmamentoEmprestimo) {
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

  delete(data: ArmamentoEmprestimo) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosEmprestimosService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  showArms(data: ArmamentoEmprestimo){
    this.cadarmamento = false;
    this.armamentosEmprestimosService.find(data.id || 0).subscribe({
      next: (data) => {
        this.armamentoEmprestimo = data;
      }
    })
    
  }

  refreshArms(){
    this.cadarmamento = false;
    this.armamentosEmprestimosService.find(this.armamentoEmprestimo.id || 0).subscribe({
      next: (data) => {
        this.armamentoEmprestimo = data;
      }
    });
  }

  rmvArmamento(id: number){
    if(window.confirm("Tem certeza que deseja excluir o armamento?")){
      this.armamentosEmprestimosItensService.remove(id).subscribe({
        next: (data) => {
          this.armamentosEmprestimosService.find(this.armamentoEmprestimo.id || 0).subscribe({
            next: (data) => {
              this.armamentoEmprestimo = data;
            }
          });
        }
      });
    }
   
  }

  cancelArm(){
    this.cadarmamento = false;
  }

  devolver(data:ArmamentoEmprestimo){
    this.armamentosEmprestimosService.find(data.id || 0).subscribe({
      next: (data) => {
        this.armamentoEmprestimo = data;
      }
    })
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

  showEmprestado(data: ArmamentoEmprestimo){
    this.emprestado = data;
  }

}