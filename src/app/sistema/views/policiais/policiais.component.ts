import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Policiais, Policial } from './policial';
import { PoliciaisService } from './policiais.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisFormComponent } from './formulario/policiais-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
@Component({
  selector: 'app-policiais',
  templateUrl: './policiais.component.html',
  styleUrl: './policiais.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisFormComponent,
    DataTableModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective, 
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisComponent implements OnInit, OnDestroy {
  protected data$!: Policiais;
  protected excluir!: Policial;
  protected policial!: Policial;
  protected pesquisa!: string;
  protected temp!: Policiais;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PoliciaisFormComponent) child!: PoliciaisFormComponent;

  constructor(
    private policiaisService: PoliciaisService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private usersService: UsersService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais');
    this.subscription = this.policiaisService.index().subscribe({
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
    this.policiaisService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Policial) {
    this.child.editar(data);
  }

  delete(data: Policial) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  usuario(data: Policial){
    this.policial = data;
  }

  confirmUser(){
    var user: User = {
      nome: this.policial.nome,
      cpf: this.policial.cpf,
      //@ts-ignore
      subunidade: this.policial.setor.subunidade.id,
      policial: this.policial,
      //@ts-ignore
      perfil: 3
    }

    this.usersService.create(user).subscribe({
      next: (data: any) => {
        this.toastr.success('Usuário gerado com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao gerar, tente novamente mais tarde!');
      },
    });
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        if(data.numeral){
          return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.graduacao.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.setor.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || !pesq
        }else{
          return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.graduacao.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.setor.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || !pesq
        }
      });
    }    
  }

}