import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Perfil, Perfis } from './perfil';
import { PerfisService } from './perfis.service';
import { TitleComponent } from '../../components/title/title.component';
import { PerfisFormComponent } from './formulario/perfis-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrl: './perfis.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PerfisFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class PerfisComponent implements OnInit, OnDestroy {
  protected data$!: Perfis;
  protected excluir!: Perfil;
  protected pesquisa!: string;
  protected temp!: Perfis;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(PerfisFormComponent) child!: PerfisFormComponent;

  constructor(
    private perfisService: PerfisService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
    this.subscription = this.perfisService.index().subscribe({
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
    this.perfisService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
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