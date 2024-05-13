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
@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisFormComponent,
    DataTableModule,
    FormsModule,
    RouterModule
  ],
})
export class MateriaisComponent implements OnInit, OnDestroy {
  protected data$!: Materiais;
  protected excluir!: Material;
  protected pesquisa!: string;
  protected temp!: Materiais;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  protected cadastrando:boolean = false;

  @ViewChild(MateriaisFormComponent) child!: MateriaisFormComponent;

  constructor(
    private materiaisService: MateriaisService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais');
    this.subscription = this.materiaisService.index().subscribe({
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
    this.materiaisService.index().subscribe({
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

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
       if(data.serial){
        return data.serial.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.material_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
       }else{
        return  data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.material_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
       }
      });
    }
  }

}