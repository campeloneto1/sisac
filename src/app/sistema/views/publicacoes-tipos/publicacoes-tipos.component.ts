import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PublicacaoTipo, PublicacoesTipos } from './publicacao-tipo';
import { PublicacoesTiposService } from './publicacoes-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PublicacoesTiposFormComponent } from './formulario/publicacoes-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-publicacoes-tipos',
  templateUrl: './publicacoes-tipos.component.html',
  styleUrl: './publicacoes-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PublicacoesTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class PublicacoesTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PublicacoesTipos>;
  protected excluir!: PublicacaoTipo;
  protected pesquisa!: string;
  protected temp!: PublicacoesTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PublicacoesTiposFormComponent) child!: PublicacoesTiposFormComponent;

  constructor(
    private publicacoesTiposService: PublicacoesTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.publicacoesTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.publicacoesTiposService.index();
  }

  editar(data: PublicacaoTipo) {
    this.child.editar(data);
  }

  delete(data: PublicacaoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.publicacoesTiposService.remove(this.excluir.id || 0).subscribe({
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