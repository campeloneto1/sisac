import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Armamento, Armamentos } from './armamento';
import { ArmamentosService } from './armamentos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosFormComponent } from './formulario/armamentos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
import { ArmamentosFormQuantidadeComponent } from './formulario-quantidade/armamentos-form-quantidade.component';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-armamentos',
  templateUrl: './armamentos.component.html',
  styleUrl: './armamentos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosFormComponent,
    ArmamentosFormQuantidadeComponent,
    DataTableModule,
    FormsModule,
    RouterModule
  ],
})
export class ArmamentosComponent implements OnInit, OnDestroy {
  protected data$!: Armamentos;
  protected excluir!: Armamento;
  protected pesquisa!: string;
  protected temp!: Armamentos;
  protected quant: number = 10;
  protected subscription: any;
  protected ajustarm!: Armamento;
  protected user!: User;
  protected cadastrando:boolean = false;

  @ViewChild(ArmamentosFormComponent) child!: ArmamentosFormComponent;
  @ViewChild(ArmamentosFormQuantidadeComponent) childQuant!: ArmamentosFormQuantidadeComponent;

  constructor(
    private armamentosService: ArmamentosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('armamentos');
    this.subscription = this.armamentosService.index().subscribe({
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
    this.cadastrando = false;
    this.armamentosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  cadastrar(){
    this.cadastrando = true;
    setTimeout(() => {
      this.child.resetForm();
    }, 100);
  }

  cancel(){
    this.cadastrando = false;
  }

  editar(data: Armamento) {
    this.cadastrando = true;
    setTimeout(() => {
      this.child.editar(data);
    }, 100);
   
  }

  delete(data: Armamento) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  ajustquant(data: Armamento){
   this.ajustarm = data;
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.serial.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.armamento_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}