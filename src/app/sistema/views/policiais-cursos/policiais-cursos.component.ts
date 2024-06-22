import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisCursos, PolicialCurso } from './policial-curso';
import { PoliciaisCursosService } from './policiais-cursos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisCursosFormComponent } from './formulario/policiais-cursos-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
@Component({
  selector: 'app-policiais-cursos',
  templateUrl: './policiais-cursos.component.html',
  styleUrl: './policiais-cursos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisCursosFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisCursosComponent implements OnInit, OnDestroy {
  protected data$!: PoliciaisCursos;
  protected excluir!: PolicialCurso;
  protected pesquisa!: string;
  protected temp!: PoliciaisCursos;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PoliciaisCursosFormComponent) child!: PoliciaisCursosFormComponent;

  constructor(
    private policiaisCursosService: PoliciaisCursosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_cursos');
    this.subscription = this.policiaisCursosService.index().subscribe({
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
    this.policiaisCursosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: PolicialCurso) {
    this.child.editar(data);
  }

  delete(data: PolicialCurso) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisCursosService.remove(this.excluir.id || 0).subscribe({
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
        if(data.policial.numeral){
            return data.policial.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.curso.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }else{
            return  data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.curso.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }
        
      });
    }
    
  }

}