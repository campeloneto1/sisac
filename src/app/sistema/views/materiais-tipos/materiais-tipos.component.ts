import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisTipos, MaterialTipo } from './material-tipo';
import { MateriaisTiposService } from './materiais-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisTiposFormComponent } from './formulario/materiais-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-materiais-tipos',
  templateUrl: './materiais-tipos.component.html',
  styleUrl: './materiais-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class MateriaisTiposComponent implements OnInit, OnDestroy {
  protected data$!: MateriaisTipos;
  protected excluir!: MaterialTipo;
  protected pesquisa!: string;
  protected temp!: MateriaisTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(MateriaisTiposFormComponent) child!: MateriaisTiposFormComponent;

  constructor(
    private materiaisTiposService: MateriaisTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.materiaisTiposService.index().subscribe({
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
    this.materiaisTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: MaterialTipo) {
    this.child.editar(data);
  }

  delete(data: MaterialTipo) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisTiposService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || !pesq
      });
    }
  }

}