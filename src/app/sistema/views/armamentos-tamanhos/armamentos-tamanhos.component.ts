import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoTamanho, ArmamentosTamanhos } from './armamento-tamanho';
import { ArmamentosTamanhosService } from './armamentos-tamanhos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosTamanhosFormComponent } from './formulario/armamentos-tamanhos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-armamentos-tamanhos',
  templateUrl: './armamentos-tamanhos.component.html',
  styleUrl: './armamentos-tamanhos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosTamanhosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ArmamentosTamanhosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ArmamentosTamanhos>;
  protected excluir!: ArmamentoTamanho;
  protected pesquisa!: string;
  protected temp!: ArmamentosTamanhos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ArmamentosTamanhosFormComponent) child!: ArmamentosTamanhosFormComponent;

  constructor(
    private armamentosTamanhosService: ArmamentosTamanhosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };
    this.data$ = this.armamentosTamanhosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.armamentosTamanhosService.index();
  }

  editar(data: ArmamentoTamanho) {
    this.child.editar(data);
  }

  delete(data: ArmamentoTamanho) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosTamanhosService.remove(this.excluir.id || 0).subscribe({
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