import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Setor, Setores } from './setor';
import { SetoresService } from './setores.service';
import { TitleComponent } from '../../components/title/title.component';
import { SetoresFormComponent } from './formulario/setores-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SetoresFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class SetoresComponent implements OnInit, OnDestroy {
  protected data$!: Setores;
  protected excluir!: Setor;
  protected pesquisa!: string;
  protected temp!: Setores;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(SetoresFormComponent) child!: SetoresFormComponent;

  constructor(
    private setoresService: SetoresService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.setoresService.index().subscribe({
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
    this.setoresService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
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

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.abreviatura?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.subunidade.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.subunidade.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}