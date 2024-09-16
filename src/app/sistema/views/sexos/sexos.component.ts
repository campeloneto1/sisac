import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sexo, Sexos} from './sexo';
import { SexosService } from './sexos.service';
import { TitleComponent } from '../../components/title/title.component';
import { SexosFormComponent } from './formulario/sexos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sexos',
  templateUrl: './sexos.component.html',
  styleUrl: './sexos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SexosFormComponent,
    FormsModule,
    DataTablesModule
  ],
})
export class SexosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Sexos>;
  protected excluir!: Sexo;
  protected pesquisa!: string;
  protected temp!: Sexos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(SexosFormComponent) child!: SexosFormComponent;

  constructor(
    private sexosService: SexosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
      order: [1, 'asc']
    };

    this.data$ = this.sexosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.sexosService.index();
  }

  editar(data: Sexo) {
    this.child.editar(data);
  }

  delete(data: Sexo) {
    this.excluir = data;
  }

  confirm() {
    this.sexosService.remove(this.excluir.id || 0).subscribe({
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