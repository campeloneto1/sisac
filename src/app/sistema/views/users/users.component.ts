import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User, Users } from './user';
import { UsersService } from './users.service';
import { TitleComponent } from '../../components/title/title.component';
import { UsersFormComponent } from './formulario/users-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { UsersSubunidadesService } from '../users-subunidades/users-subunidades.service';
import { UsersSubunidadesFormComponent } from '../users-subunidades/formulario/users-subunidades-form.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    UsersFormComponent,
    UsersSubunidadesFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  protected data$!: Users;
  protected usuario!: User;
  protected excluir!: User;
  protected pesquisa!: string;
  protected temp!: Users;
  protected quant: number = 10;
  protected subscription: any;

  protected cadsubunidade: boolean = false;

  protected user!: User;

  @ViewChild(UsersFormComponent) child!: UsersFormComponent;
  @ViewChild(UsersSubunidadesFormComponent) child2!: UsersSubunidadesFormComponent;

  constructor(
    private usersService: UsersService,
    private usersSubunidadesService: UsersSubunidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('usuarios');
    this.subscription = this.usersService.index().subscribe({
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
    this.usersService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: User) {
    this.child.editar(data);
  }

  delete(data: User) {
    this.excluir = data;
  }

  confirm() {
    this.usersService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  reset(data:User){
    this.usuario = data;
  }

  confirmReset(){
    this.usersService.reset(this.usuario).subscribe({
      next: (data: any) => {
        this.toastr.success('Senha alterada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao alterar senha, tente novamente mais tarde!');
      },
    });
  }

  showSubunidades(data: User){
    this.usuario = data;
  }

  refreshSubunidades(){
    this.cadsubunidade = false;
    this.usersService.find(this.usuario.id || 0).subscribe({
      next: (data: User) => {
        this.usuario = data;
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao consultar contrato!');
      },
    })
  }

  cancelarCadSubunidade(){
    this.cadsubunidade = false;
  }

  rmvSubunidade(id: number){
    if(window.confirm("Tem certeza que deseja excluir a subunidade?")){
      this.usersSubunidadesService.remove(id).subscribe({
        next: (data) => {
          this.usersService.find(this.usuario.id || 0).subscribe({
            next: (data) => {
              this.usuario = data;
              this.refresh();
            }
          });
        }
      });
    }
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || 
        data.cpf.toLocaleLowerCase().indexOf(pesq) !== -1 ||
        data.perfil.nome.toLocaleLowerCase().indexOf(pesq) !== -1 ||
        !pesq
      });
    }
    
  }

}