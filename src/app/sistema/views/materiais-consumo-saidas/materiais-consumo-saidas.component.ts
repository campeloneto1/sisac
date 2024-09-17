import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumoSaidas, MaterialConsumoSaida } from './material-consumo-saida';
import { MateriaisConsumoSaidasService } from './materiais-consumo-saidas.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoSaidasFormComponent } from './formulario/materiais-consumo-saidas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';
import { RouterModule } from '@angular/router';
import { MateriaisConsumoSaidasItensFormComponent } from '../materiais-consumo-saidas-itens/formulario/materiais-consumo-saidas-itens-form.component';
import { MateriaisConsumoSaidasItensService } from '../materiais-consumo-saidas-itens/materiais-consumo-saidas-itens.service';
import { format } from 'date-fns';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-materiais-consumo-saidas',
  templateUrl: './materiais-consumo-saidas.component.html',
  styleUrl: './materiais-consumo-saidas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisConsumoSaidasFormComponent,
    MateriaisConsumoSaidasItensFormComponent,
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
export class MateriaisConsumoSaidasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<MateriaisConsumoSaidas>;
  protected excluir!: MaterialConsumoSaida;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumoSaidas;
  protected quant: number = 10;
  protected subscription: any;
  protected materialConsumoSaida!: MaterialConsumoSaida;

  protected cadastrando:boolean = false;

  protected cadmaterial:boolean = false;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(MateriaisConsumoSaidasFormComponent) child!: MateriaisConsumoSaidasFormComponent;
  @ViewChild(MateriaisConsumoSaidasItensFormComponent) childmaterial!: MateriaisConsumoSaidasItensFormComponent;

  constructor(
    private materiaisConsumoSaidasService: MateriaisConsumoSaidasService,
    private materiaisConsumoSaidasItensService: MateriaisConsumoSaidasItensService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais_consumo_saidas');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [0, 'desc']};

    this.data$ = this.materiaisConsumoSaidasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.materiaisConsumoSaidasService.index();
  }

  editar(data: MaterialConsumoSaida) {
    this.cadastrando = false;
    setTimeout(() => {
      this.cadastrando = true;
    }, 100);
    setTimeout(() => {
      this.child.editar(data);
    }, 200);
    

  }

  cadastrar(){
    this.cadastrando = false;
    setTimeout(() => {
      this.cadastrando = true;
    }, 100);
    setTimeout(() => {
      this.child.reset();
    }, 200);
  }

  delete(data: MaterialConsumoSaida) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisConsumoSaidasService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  showMat(data: MaterialConsumoSaida){
    this.cadmaterial = false;
    this.materiaisConsumoSaidasService.find(data.id || 0).subscribe({
      next: (data) => {
        this.materialConsumoSaida = data;
      }
    })
    
  }

  refreshMat(){
    this.cadmaterial = false;
    this.materiaisConsumoSaidasService.find(this.materialConsumoSaida.id || 0).subscribe({
      next: (data) => {
        this.materialConsumoSaida = data;
      }
    });
  }

  rmvMaterial(id: number){
    if(window.confirm("Tem certeza que deseja excluir o material?")){
      this.materiaisConsumoSaidasItensService.remove(id).subscribe({
        next: (data) => {
          this.materiaisConsumoSaidasService.find(this.materialConsumoSaida.id || 0).subscribe({
            next: (data) => {
              this.materialConsumoSaida = data;
            }
          });
        }
      });
    }
   
  }

  cancelMat(){
    this.cadmaterial = false;
  }

  checkDate(data: MaterialConsumoSaida){
    var datahj = new Date();
    if(format(data.data_saida, 'yyyy-MM-dd') == format(datahj, 'yyyy-MM-dd')){
      return true
    }else{
      return false
    }
    
  }
  
}