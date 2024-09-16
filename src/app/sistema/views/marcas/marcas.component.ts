import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Marca, Marcas } from './marca';
import { MarcasService } from './marcas.service';
import { TitleComponent } from '../../components/title/title.component';
import { MarcasFormComponent } from './formulario/marcas-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MarcasFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class MarcasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Marcas>;
  protected excluir!: Marca;
  protected pesquisa!: string;
  protected temp!: Marcas;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(MarcasFormComponent) child!: MarcasFormComponent;

  constructor(
    private marcasService: MarcasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.marcasService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.marcasService.index();
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

}