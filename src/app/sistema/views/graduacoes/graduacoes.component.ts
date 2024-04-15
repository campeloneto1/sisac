import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Graduacao, Graduacoes } from './graduacao';
import { GraduacoesService } from './graduacoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { GraduacoesFormComponent } from './formulario/graduacoes-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrl: './graduacoes.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, GraduacoesFormComponent],
})
export class GraduacoesComponent implements OnInit {
  protected data$!: Observable<Graduacoes>;
  protected excluir!: Graduacao;
  protected dtOptions!: any;

  @ViewChild(GraduacoesFormComponent) child!: GraduacoesFormComponent;

  constructor(
    private graduacoesService: GraduacoesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOprtions();
    this.data$ = this.graduacoesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.graduacoesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Graduacao) {
    this.child.editar(data);
  }

  delete(data: Graduacao) {
    this.excluir = data;
  }

  confirm() {
    this.graduacoesService.remove(this.excluir.id || 0).subscribe({
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
