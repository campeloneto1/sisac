import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Materiais, Material } from './material';
import { MateriaisService } from './materiais.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisFormComponent } from './formulario/materiais-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisFormComponent,
    DataTablesModule,
    FormsModule,
    RouterModule
  ],
})
export class MateriaisComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Materiais>;
  protected excluir!: Material;
  protected pesquisa!: string;
  protected temp!: Materiais;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  protected cadastrando:boolean = false;

  @ViewChild(MateriaisFormComponent) child!: MateriaisFormComponent;

  constructor(
    private materiaisService: MateriaisService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.materiaisService.index();
  }

  ngOnDestroy(): void {
   
  }

  refresh() {
    this.data$ = this.materiaisService.index();
  }

  cadastrar(){
    this.cadastrando = true;
    setTimeout(() => {
      this.child.resetForm();
    }, 100);
  }

  editar(data: Material) {
    this.cadastrando = true;
    setTimeout(() => {
      this.child.editar(data);
    }, 100);
  }

  delete(data: Material) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  resetForm(){
    this.child.resetForm();
    this.cadastrando = false;
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}