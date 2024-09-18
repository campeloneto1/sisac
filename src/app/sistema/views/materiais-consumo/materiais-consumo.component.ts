import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MateriaisConsumo, MaterialConsumo } from './material-consumo';
import { MateriaisConsumoService } from './materiais-consumo.service';
import { TitleComponent } from '../../components/title/title.component';
import { MateriaisConsumoFormComponent } from './formulario/materiais-consumo-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-materiais-consumo',
  templateUrl: './materiais-consumo.component.html',
  styleUrl: './materiais-consumo.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisConsumoFormComponent,
    DataTablesModule,
    FormsModule,
    RouterModule
  ],
})
export class MateriaisConsumoComponent implements OnInit, OnDestroy {
  protected data$!: Observable<MateriaisConsumo>;
  protected excluir!: MaterialConsumo;
  protected pesquisa!: string;
  protected temp!: MateriaisConsumo;
  protected quant: number = 10;
  protected subscription: any;

  protected cadastrando: boolean = false;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(MateriaisConsumoFormComponent) child!: MateriaisConsumoFormComponent;

  constructor(
    private materiaisConsumoService: MateriaisConsumoService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais_consumo');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [1, 'asc']};

    this.data$ = this.materiaisConsumoService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ =  this.materiaisConsumoService.index();
  }

  editar(data: MaterialConsumo) {
    this.cadastrando = true;
    setTimeout(() => {
      this.child.editar(data);
    }, 100);
  }

  cadastrar(){
    this.cadastrando = true;
    setTimeout(() => {
      this.child.resetForm();
    }, 100);
  }

  resetForm(){
    this.child.resetForm();
    this.cadastrando = false;
  }

  delete(data: MaterialConsumo) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisConsumoService.remove(this.excluir.id || 0).subscribe({
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