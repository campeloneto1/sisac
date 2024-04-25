import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Estado, Estados } from './estado';
import { EstadosService } from './estados.service';
import { TitleComponent } from '../../components/title/title.component';
import { EstadosFormComponent } from './formulario/estados-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    EstadosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class EstadosComponent implements OnInit, OnDestroy {
  protected data$!: Estados;
  protected excluir!: Estado;
  protected pesquisa!: string;
  protected temp!: Estados;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(EstadosFormComponent) child!: EstadosFormComponent;

  constructor(
    private estadosService: EstadosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.estadosService.index().subscribe({
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
    this.estadosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Estado) {
    this.child.editar(data);
  }

  delete(data: Estado) {
    this.excluir = data;
  }

  confirm() {
    this.estadosService.remove(this.excluir.id || 0).subscribe({
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
        || data.pais.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.pais.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}