import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DocumentoTipo, DocumentosTipos } from './documento-tipo';
import { DocumentosTiposService } from './documentos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { DocumentosTiposFormComponent } from './formulario/documentos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-documentos-tipos',
  templateUrl: './documentos-tipos.component.html',
  styleUrl: './documentos-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    DocumentosTiposFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class DocumentosTiposComponent implements OnInit, OnDestroy {
  protected data$!: Observable<DocumentosTipos>;
  protected excluir!: DocumentoTipo;
  protected pesquisa!: string;
  protected temp!: DocumentosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(DocumentosTiposFormComponent) child!: DocumentosTiposFormComponent;

  constructor(
    private documentosTiposService: DocumentosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.documentosTiposService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.documentosTiposService.index();
  }

  editar(data: DocumentoTipo) {
    this.child.editar(data);
  }

  delete(data: DocumentoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.documentosTiposService.remove(this.excluir.id || 0).subscribe({
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