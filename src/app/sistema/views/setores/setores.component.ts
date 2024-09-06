import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Setor, Setores } from './setor';
import { SetoresService } from './setores.service';
import { TitleComponent } from '../../components/title/title.component';
import { SetoresFormComponent } from './formulario/setores-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SetoresFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class SetoresComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Setores>;
  protected excluir!: Setor;
  protected pesquisa!: string;
  protected temp!: Setores;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(SetoresFormComponent) child!: SetoresFormComponent;

  constructor(
    private setoresService: SetoresService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.setoresService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.setoresService.index();
  }

  editar(data: Setor) {
    this.child.editar(data);
  }

  delete(data: Setor) {
    this.excluir = data;
  }

  confirm() {
    this.setoresService.remove(this.excluir.id || 0).subscribe({
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