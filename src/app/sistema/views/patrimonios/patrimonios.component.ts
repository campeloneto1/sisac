import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Patrimonio, Patrimonios } from './patrimonio';
import { PatrimoniosService } from './patrimonios.service';
import { TitleComponent } from '../../components/title/title.component';
import { PatrimoniosFormComponent } from './formulario/patrimonios-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-patrimonios',
  templateUrl: './patrimonios.component.html',
  styleUrl: './patrimonios.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PatrimoniosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class PatrimoniosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Patrimonios>;
  protected excluir!: Patrimonio;
  protected pesquisa!: string;
  protected temp!: Patrimonios;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PatrimoniosFormComponent) child!: PatrimoniosFormComponent;

  constructor(
    private patrimoniosService: PatrimoniosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('patrimonios');
    this.dtOptions = {
      pageLength: 10,
      order: [5, 'asc']
    };

    this.data$ = this.patrimoniosService.index();
  }

  ngOnDestroy(): void {
    
  }

  refresh() {
    this.data$ = this.patrimoniosService.index();
  }

  editar(data: Patrimonio) {
    this.child.editar(data);
  }

  delete(data: Patrimonio) {
    this.excluir = data;
  }

  confirm() {
    this.patrimoniosService.remove(this.excluir.id || 0).subscribe({
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