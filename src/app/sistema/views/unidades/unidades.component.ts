import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Unidade, Unidades } from './unidade';
import { UnidadesService } from './unidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { UnidadesFormComponent } from './formulario/unidades-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    UnidadesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class UnidadesComponent implements OnInit, OnDestroy {
  protected data$!: Unidades;
  protected excluir!: Unidade;
  protected pesquisa!: string;
  protected temp!: Unidades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(UnidadesFormComponent) child!: UnidadesFormComponent;

  constructor(
    private unidadesService: UnidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.unidadesService.index().subscribe({
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
    this.unidadesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Unidade) {
    this.child.editar(data);
  }

  delete(data: Unidade) {
    this.excluir = data;
  }

  confirm() {
    this.unidadesService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }    
  }

}