import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Escolaridade, Escolaridades } from './escolaridade';
import { EscolaridadesService } from './escolaridades.service';
import { TitleComponent } from '../../components/title/title.component';
import { EscolaridadesFormComponent } from './formulario/escolaridades-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-escolaridades',
  templateUrl: './escolaridades.component.html',
  styleUrl: './escolaridades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    EscolaridadesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class EscolaridadesComponent implements OnInit, OnDestroy {
  protected data$!: Escolaridades;
  protected excluir!: Escolaridade;
  protected pesquisa!: string;
  protected temp!: Escolaridades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(EscolaridadesFormComponent) child!: EscolaridadesFormComponent;

  constructor(
    private escolaridadesService: EscolaridadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.escolaridadesService.index().subscribe({
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
    this.escolaridadesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Escolaridade) {
    this.child.editar(data);
  }

  delete(data: Escolaridade) {
    this.excluir = data;
  }

  confirm() {
    this.escolaridadesService.remove(this.excluir.id || 0).subscribe({
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
        || !pesq
      });
    }
  }

}