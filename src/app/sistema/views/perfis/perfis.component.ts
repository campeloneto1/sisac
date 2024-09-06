import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Perfil, Perfis } from './perfil';
import { PerfisService } from './perfis.service';
import { TitleComponent } from '../../components/title/title.component';
import { PerfisFormComponent } from './formulario/perfis-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { Observable } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrl: './perfis.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PerfisFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class PerfisComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Perfis>;
  protected excluir!: Perfil;
  protected pesquisa!: string;
  protected temp!: Perfis;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PerfisFormComponent) child!: PerfisFormComponent;

  constructor(
    private perfisService: PerfisService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ =  this.perfisService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.perfisService.index();
  }

  editar(data: Perfil) {
    this.child.editar(data);
  }

  delete(data: Perfil) {
    this.excluir = data;
  }

  confirm() {
    this.perfisService.remove(this.excluir.id || 0).subscribe({
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