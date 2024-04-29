import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PatrimonioTipo, PatrimoniosTipos } from './patrimonio-tipo';
import { PatrimoniosTiposService } from './patrimonios-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PatrimoniosTiposFormComponent } from './formulario/patrimonios-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-patrimonios-tipos',
  templateUrl: './patrimonios-tipos.component.html',
  styleUrl: './patrimonios-tipos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PatrimoniosTiposFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class ManutencoesTiposComponent implements OnInit, OnDestroy {
  protected data$!: PatrimoniosTipos;
  protected excluir!: PatrimonioTipo;
  protected pesquisa!: string;
  protected temp!: PatrimoniosTipos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(PatrimoniosTiposFormComponent) child!: PatrimoniosTiposFormComponent;

  constructor(
    private patrimoniosTiposService: PatrimoniosTiposService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.patrimoniosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
        this.temp = data;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.patrimoniosTiposService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: PatrimonioTipo) {
    this.child.editar(data);
  }

  delete(data: PatrimonioTipo) {
    this.excluir = data;
  }

  confirm() {
    this.patrimoniosTiposService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}