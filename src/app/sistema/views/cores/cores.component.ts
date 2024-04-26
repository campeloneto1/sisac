import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cor, Cores } from './cor';
import { CoresService } from './cores.service';
import { TitleComponent } from '../../components/title/title.component';
import { CoresFormComponent } from './formulario/cores-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-cores',
  templateUrl: './cores.component.html',
  styleUrl: './cores.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    CoresFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class CoresComponent implements OnInit, OnDestroy {
  protected data$!: Cores;
  protected excluir!: Cor;
  protected pesquisa!: string;
  protected temp!: Cores;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(CoresFormComponent) child!: CoresFormComponent;

  constructor(
    private coresService: CoresService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.coresService.index().subscribe({
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
    this.coresService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Cor) {
    this.child.editar(data);
  }

  delete(data: Cor) {
    this.excluir = data;
  }

  confirm() {
    this.coresService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 || !pesq
      });
    }
  }

}