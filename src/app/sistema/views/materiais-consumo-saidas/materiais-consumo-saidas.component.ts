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
export class MateriaisConsumoSaidasComponent implements OnInit, OnDestroy {
  protected data$!: MateriaisConsumoSaidas;
  protected excluir!: MaterialConsumoSaida;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumoSaidas;
  protected quant: number = 10;
  protected subscription: any;
  protected materialConsumoSaida!: MaterialConsumoSaida;

  protected cadmaterial:boolean = false;

  protected user!: User;

  @ViewChild(MateriaisConsumoSaidasFormComponent) child!: MateriaisConsumoSaidasFormComponent;
  @ViewChild(MateriaisConsumoSaidasItensFormComponent) childmaterial!: MateriaisConsumoSaidasItensFormComponent;

  constructor(
    private materiaisConsumoSaidasService: MateriaisConsumoSaidasService,
    private materiaisConsumoSaidasItensService: MateriaisConsumoSaidasItensService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais_consumo_saidas');
    this.subscription = this.materiaisConsumoSaidasService.index().subscribe({
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
    this.materiaisConsumoSaidasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: MaterialConsumoSaida) {
    this.child.editar(data);

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

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        if(data.user.policial){
            return data.user.nome?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.user.cpf.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.user.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.user.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.materiais_consumo.material_consumo_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.materiais_consumo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1   
        || data.materiais_consumo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1         
        || !pesq
        }else{
            return data.user.nome?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.user.cpf.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.materiais_consumo.material_consumo_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.materiais_consumo.modelo.marca.nome.toLocaleLowerCase().indexOf(pesq) !== -1   
        || data.materiais_consumo.modelo.nome.toLocaleLowerCase().indexOf(pesq) !== -1         
        || !pesq
        }
      });
    }
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

  
}