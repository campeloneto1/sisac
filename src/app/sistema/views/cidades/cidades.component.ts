import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cidade, Cidades } from './cidade';
import { CidadesService } from './cidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { CidadesFormComponent } from './formulario/cidades-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrl: './cidades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    CidadesFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class CidadesComponent implements OnInit, OnDestroy {
  protected data$!: Cidades;
  protected excluir!: Cidade;
  protected pesquisa!: string;
  protected temp!: Cidades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(CidadesFormComponent) child!: CidadesFormComponent;

  constructor(
    private cidadesService: CidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.cidadesService.index().subscribe({
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
    this.cidadesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Cidade) {
    this.child.editar(data);
  }

  delete(data: Cidade) {
    this.excluir = data;
  }

  confirm() {
    this.cidadesService.remove(this.excluir.id || 0).subscribe({
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
        || data.estado.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.estado.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}