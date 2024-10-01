import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Documento, Documentos } from './documento';
import { DocumentosService } from './documentos.service';
import { TitleComponent } from '../../components/title/title.component';
import { DocumentosFormComponent } from './formulario/documentos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
import { User } from '../users/user';
import { SharedService } from '../../shared/shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    DocumentosFormComponent,
    DataTablesModule,
    RouterModule,
    FormsModule,
  ],
})
export class DocumentosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Documentos>;
  protected excluir!: Documento;
  protected pesquisa!: string;
  protected temp!: Documentos;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(DocumentosFormComponent) child!: DocumentosFormComponent;

  constructor(
    private documentosService: DocumentosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('documentos');
    this.user = this.sessionService.getUser();
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [0, 'desc']};
    this.data$ = this.documentosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.documentosService.index();
  }

  editar(data: Documento) {
    this.child.editar(data);
  }

  delete(data: Documento) {
    this.excluir = data;
  }

  confirm() {
    this.documentosService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}