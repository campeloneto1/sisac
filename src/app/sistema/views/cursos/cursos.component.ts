import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Curso, Cursos } from './curso';
import { CursosService } from './cursos.service';
import { TitleComponent } from '../../components/title/title.component';
import { CursosFormComponent } from './formulario/cursos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    CursosFormComponent,
    DataTableModule,
    FormsModule
  ],
})
export class CursosComponent implements OnInit, OnDestroy {
  protected data$!: Cursos;
  protected excluir!: Curso;
  protected pesquisa!: string;
  protected temp!: Cursos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(CursosFormComponent) child!: CursosFormComponent;

  constructor(
    private cursosService: CursosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.cursosService.index().subscribe({
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
    this.cursosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Curso) {
    this.child.editar(data);
  }

  delete(data: Curso) {
    this.excluir = data;
  }

  confirm() {
    this.cursosService.remove(this.excluir.id || 0).subscribe({
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
       if(data.abreviatura){
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1
        || !pesq
       }else{
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
       }
      });
    }
  }

}