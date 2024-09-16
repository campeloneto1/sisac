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
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
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
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Users>;
  protected usuario!: User;
  protected excluir!: User;
  protected pesquisa!: string;
  protected temp!: Users;
  protected quant: number = 10;
  protected subscription: any;

  protected cadsubunidade: boolean = false;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

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
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.usersService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.usersService.index();
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

}