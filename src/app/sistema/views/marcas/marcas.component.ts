import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Marca, Marcas } from './marca';
import { MarcasService } from './marcas.service';
import { TitleComponent } from '../../components/title/title.component';
import { MarcasFormComponent } from './formulario/marcas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MarcasFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class MarcasComponent implements OnInit, OnDestroy {
  protected data$!: Marcas;
  protected excluir!: Marca;
  protected pesquisa!: string;
  protected temp!: Marcas;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(MarcasFormComponent) child!: MarcasFormComponent;

  constructor(
    private marcasService: MarcasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.marcasService.index().subscribe({
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
    this.marcasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Marca) {
    this.child.editar(data);
  }

  delete(data: Marca) {
    this.excluir = data;
  }

  confirm() {
    this.marcasService.remove(this.excluir.id || 0).subscribe({
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
        || data.abreviatura?.toLocaleLowerCase().indexOf(pesq) !== -1
        || !pesq
      });
    }
  }

}