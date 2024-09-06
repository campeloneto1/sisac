import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cidade, Cidades } from './cidade';
import { CidadesService } from './cidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { CidadesFormComponent } from './formulario/cidades-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrl: './cidades.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    CidadesFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class CidadesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Cidades>;
  protected excluir!: Cidade;
  protected pesquisa!: string;
  protected temp!: Cidades;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(CidadesFormComponent) child!: CidadesFormComponent;

  constructor(
    private cidadesService: CidadesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.data$ = this.cidadesService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.cidadesService.index();
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

}