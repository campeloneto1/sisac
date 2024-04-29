import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Patrimonio, Patrimonios } from './patrimonio';
import { PatrimoniosService } from './patrimonios.service';
import { TitleComponent } from '../../components/title/title.component';
import { PatrimoniosFormComponent } from './formulario/patrimonios-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-patrimonios',
  templateUrl: './patrimonios.component.html',
  styleUrl: './patrimonios.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PatrimoniosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class PatrimoniosComponent implements OnInit, OnDestroy {
  protected data$!: Patrimonios;
  protected excluir!: Patrimonio;
  protected pesquisa!: string;
  protected temp!: Patrimonios;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PatrimoniosFormComponent) child!: PatrimoniosFormComponent;

  constructor(
    private patrimoniosService: PatrimoniosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('patrimonios');
    this.subscription = this.patrimoniosService.index().subscribe({
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
    this.patrimoniosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Patrimonio) {
    this.child.editar(data);
  }

  delete(data: Patrimonio) {
    this.excluir = data;
  }

  confirm() {
    this.patrimoniosService.remove(this.excluir.id || 0).subscribe({
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
        if(data.nome && data.serial){
          return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.serial.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.tombo.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.setor.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.patrimonio_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || !pesq
      }else if(data.nome){
            return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.tombo.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.setor.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.patrimonio_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }else if(data.serial){
            return data.serial.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.tombo.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.setor.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.patrimonio_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }else{
            return data.tombo.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.setor.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.patrimonio_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }
      });
    }
  }

}