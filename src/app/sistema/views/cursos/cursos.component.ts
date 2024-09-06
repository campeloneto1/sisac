import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Curso, Cursos } from './curso';
import { CursosService } from './cursos.service';
import { TitleComponent } from '../../components/title/title.component';
import { CursosFormComponent } from './formulario/cursos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    CursosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class CursosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Cursos>;
  protected excluir!: Curso;
  protected pesquisa!: string;
  protected temp!: Cursos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(CursosFormComponent) child!: CursosFormComponent;

  constructor(
    private cursosService: CursosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.subscription = this.cursosService.index();
  }

  ngOnDestroy(): void {
   
  }

  refresh() {
    this.data$ = this.cursosService.index();
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

}