import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Unidade, Unidades } from './unidade';
import { UnidadesService } from './unidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { UnidadesFormComponent } from './formulario/unidades-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, UnidadesFormComponent],
})
export class UnidadesComponent implements OnInit {
  protected data$!: Observable<Unidades>;
  protected excluir!: Unidade;
  protected dtOptions!: any;

  @ViewChild(UnidadesFormComponent) child!: UnidadesFormComponent;

  constructor(
    private unidadesService:UnidadesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.unidadesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.unidadesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Unidade) {
    this.child.editar(data);
  }

  delete(data: Unidade) {
    this.excluir = data;
  }

  confirm() {
    this.unidadesService.remove(this.excluir.id || 0).subscribe({
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
