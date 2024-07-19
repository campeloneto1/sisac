import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumoEntradas,MaterialConsumoEntrada } from './material-consumo-entrada';
import { MateriaisConsumoEntradasService } from './materiais-consumo-entradas.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoEntradasFormComponent } from './formulario/materiais-consumo-entradas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';
import { RouterModule } from '@angular/router';
import { MateriaisConsumoEntradasItensFormComponent } from '../materiais-consumo-entradas-itens/formulario/materiais-consumo-entradas-itens-form.component';
import { MateriaisConsumoEntradasItensService } from '../materiais-consumo-entradas-itens/materiais-consumo-entradas-itens.service';
import { format } from 'date-fns';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-materiais-consumo-entradas',
  templateUrl: './materiais-consumo-entradas.component.html',
  styleUrl: './materiais-consumo-entradas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisConsumoEntradasFormComponent,
    MateriaisConsumoEntradasItensFormComponent,
    DataTableModule,
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
export class MateriaisConsumoEntradasComponent implements OnInit, OnDestroy {
  protected data$!: MateriaisConsumoEntradas;
  protected excluir!: MaterialConsumoEntrada;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumoEntradas;
  protected quant: number = 10;
  protected subscription: any;
  protected materialConsumoEntrada!: MaterialConsumoEntrada;

  protected cadmaterial:boolean = false;

  protected user!: User;

  @ViewChild(MateriaisConsumoEntradasFormComponent) child!: MateriaisConsumoEntradasFormComponent;
  @ViewChild(MateriaisConsumoEntradasItensFormComponent) childmaterial!: MateriaisConsumoEntradasItensFormComponent;

  constructor(
    private materiaisConsumoEntradasService: MateriaisConsumoEntradasService,
    private materiaisConsumoEntradasItensService: MateriaisConsumoEntradasItensService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais_consumo_saidas');
    this.subscription = this.materiaisConsumoEntradasService.index().subscribe({
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
    this.materiaisConsumoEntradasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: MaterialConsumoEntrada) {
    this.child.editar(data);

  }

  delete(data: MaterialConsumoEntrada) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisConsumoEntradasService.remove(this.excluir.id || 0).subscribe({
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
        if(data.user.policial){
            if(data.user.policial.numeral){
              return data.user.nome?.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.cpf.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.numeral.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
              || !pesq
            }else{
              return data.user.nome?.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.cpf.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
              || data.user.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
              || !pesq
            }
        }else{
            return data.user.nome?.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.user.cpf.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }
      });
    }
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

  showMat(data: MaterialConsumoEntrada){
    this.cadmaterial = false;
    this.materiaisConsumoEntradasService.find(data.id || 0).subscribe({
      next: (data) => {
        this.materialConsumoEntrada = data;
      }
    })
    
  }

  refreshMat(){
    this.cadmaterial = false;
    this.materiaisConsumoEntradasService.find(this.materialConsumoEntrada.id || 0).subscribe({
      next: (data) => {
        this.materialConsumoEntrada = data;
      }
    });
  }

  rmvMaterial(id: number){
    if(window.confirm("Tem certeza que deseja excluir o material?")){
      this.materiaisConsumoEntradasItensService.remove(id).subscribe({
        next: (data) => {
          this.materiaisConsumoEntradasService.find(this.materialConsumoEntrada.id || 0).subscribe({
            next: (data) => {
              this.materialConsumoEntrada = data;
            }
          });
        }
      });
    }
   
  }

  cancelMat(){
    this.cadmaterial = false;
  }

  checkDate(data: MaterialConsumoEntrada){
    var datahj = new Date();
    if(format(data.data_entrada, 'yyyy-MM-dd') == format(datahj, 'yyyy-MM-dd')){
      return true
    }else{
      return false
    }
    
  }
  
}