import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subunidade, Subunidades } from './subunidade';
import { SubunidadesService } from './subunidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { SubunidadesFormComponent } from './formulario/subunidades-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-subunidades',
  templateUrl: './subunidades.component.html',
  styleUrl: './subunidades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SubunidadesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class SubunidadesComponent implements OnInit, OnDestroy {
  protected data$!: Subunidades;
  protected excluir!: Subunidade;
  protected pesquisa!: string;
  protected temp!: Subunidades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(SubunidadesFormComponent) child!: SubunidadesFormComponent;

  constructor(
    private subunidadesService: SubunidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.subunidadesService.index().subscribe({
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
    this.subunidadesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Subunidade) {
    this.child.editar(data);
  }

  delete(data: Subunidade) {
    this.excluir = data;
  }

  confirm() {
    this.subunidadesService.remove(this.excluir.id || 0).subscribe({
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
        || data.unidade.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.unidade.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }    
  }

}