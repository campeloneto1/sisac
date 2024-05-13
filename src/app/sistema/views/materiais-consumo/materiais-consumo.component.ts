import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumo, MaterialConsumo } from './material-consumo';
import { MateriaisConsumoService } from './materiais-consumo.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoFormComponent } from './formulario/materiais-consumo-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-materiais-consumo',
  templateUrl: './materiais-consumo.component.html',
  styleUrl: './materiais-consumo.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisConsumoFormComponent,
    DataTableModule,
    FormsModule,
    RouterModule
  ],
})
export class MateriaisConsumoComponent implements OnInit, OnDestroy {
  protected data$!: MateriaisConsumo;
  protected excluir!: MaterialConsumo;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumo;
  protected quant: number = 10;
  protected subscription: any;

  protected cadastrando: boolean = false;

  protected user!: User;

  @ViewChild(MateriaisConsumoFormComponent) child!: MateriaisConsumoFormComponent;

  constructor(
    private materiaisConsumoService: MateriaisConsumoService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais_consumo');
    this.subscription = this.materiaisConsumoService.index().subscribe({
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
    this.materiaisConsumoService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: MaterialConsumo) {
    this.cadastrando = true;
    setTimeout(() => {
      this.child.editar(data);
    }, 100);
  }

  cadastrar(){
    this.cadastrando = true;
    setTimeout(() => {
      this.child.resetForm();
    }, 100);
  }

  resetForm(){
    this.child.resetForm();
    this.cadastrando = false;
  }

  delete(data: MaterialConsumo) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisConsumoService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
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
            || data.material_consumo_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }else{
            return data.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.material_consumo_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }
      });
    }
  }

}