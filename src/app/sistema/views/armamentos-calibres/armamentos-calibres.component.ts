import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArmamentoCalibre, ArmamentosCalibres } from './armamento-calibre';
import { ArmamentosCalibresService } from './armamentos-calibres.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosCalibresFormComponent } from './formulario/armamentos-calibres-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { Observable } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-armamentos-calibres',
  templateUrl: './armamentos-calibres.component.html',
  styleUrl: './armamentos-calibres.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosCalibresFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class ArmamentosCalibresComponent implements OnInit, OnDestroy {
  protected data$!: Observable<ArmamentosCalibres>;
  protected excluir!: ArmamentoCalibre;
  protected pesquisa!: string;
  protected temp!: ArmamentosCalibres;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ArmamentosCalibresFormComponent) child!: ArmamentosCalibresFormComponent;

  constructor(
    private armamentosCalibresService: ArmamentosCalibresService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.armamentosCalibresService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.armamentosCalibresService.index();
  }

  editar(data: ArmamentoCalibre) {
    this.child.editar(data);
  }

  delete(data: ArmamentoCalibre) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosCalibresService.remove(this.excluir.id || 0).subscribe({
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