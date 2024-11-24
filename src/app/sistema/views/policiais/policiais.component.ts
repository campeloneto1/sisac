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
import { SharedService } from '../../shared/shared.service';
import { environment } from "../../../../environments/environments";
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policiais',
  templateUrl: './policiais.component.html',
  styleUrl: './policiais.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisFormComponent,
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
export class PoliciaisComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Policiais>;
  protected excluir!: Policial;
  protected policial!: Policial;
  protected pesquisa!: string;
  protected temp!: Policiais;
  protected quant: number = 10;
  protected subscription: any;
  protected file!:any; 

  protected urlfoto:string = environment.image;

  protected user!: User;
  protected foto!: any;

  protected params!: any; 

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisFormComponent) child!: PoliciaisFormComponent;

  constructor(
    private policiaisService: PoliciaisService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [5, 'asc']};

    this.route.queryParamMap.subscribe(params => {
      if (params.has('inativo')) {
        this.params = {inativo:params.get('inativo')};
      }
      if (params.has('ativo')) {
        this.params = {ativo:params.get('ativo')};
      }
    });

    this.data$ = this.policiaisService.index(this.params);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisService.index(this.params);
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

  showfoto(data: Policial){
    this.policial = data;
    if(this.policial.foto){
      this.getfile(data);
    }
    
  }

  uploadFoto(event: any){
    var fileName = "";
    const formData = new FormData();
    const file:File = event.target.files[0];
    if (file) {
      fileName = file.name;
      formData.append("file", file);
      //formData.append("id", this.policial.id+'');
      this.sharedService.uploadFoto(formData).subscribe({
        next: (data) => {
          //console.log(data);
          //@ts-ignore
          this.policiaisService.updateFoto(this.policial.id, {
            //@ts-ignore
            foto: data.data
          }).subscribe({
            next: (data) => {
              this.toastr.success('Foto atualizada com sucesso!');
              this.refresh();
            }
          })
        }
      })
    }
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

  getfile(data: Policial){
    var obj = {
      file: data.foto
    }
    this.sharedService.getFile(obj).subscribe({
      next: (data) => {
        const url = window.URL.createObjectURL(data);
        this.foto = url;
      }
    })
  }
}