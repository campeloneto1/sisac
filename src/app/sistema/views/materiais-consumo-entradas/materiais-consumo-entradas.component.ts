import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumoEntradas,MaterialConsumoEntrada } from './material-consumo-entrada';
import { MateriaisConsumoEntradasService } from './materiais-consumo-entradas.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoEntradasFormComponent } from './formulario/materiais-consumo-entradas-form.component';
import { ToastrService } from 'ngx-toastr';
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
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
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
export class MateriaisConsumoEntradasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<MateriaisConsumoEntradas>;
  protected excluir!: MaterialConsumoEntrada;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumoEntradas;
  protected quant: number = 10;
  protected subscription: any;
  protected materialConsumoEntrada!: MaterialConsumoEntrada;

  protected cadmaterial:boolean = false;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

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
    this.dtOptions = {
      pageLength: 10,
      order: [0, 'desc']
    };

    this.data$ = this.materiaisConsumoEntradasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ =  this.materiaisConsumoEntradasService.index();
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