import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Subunidade, Subunidades } from './subunidade';
import { SubunidadesService } from './subunidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { SubunidadesFormComponent } from './formulario/subunidades-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-subunidades',
  templateUrl: './subunidades.component.html',
  styleUrl: './subunidades.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, SubunidadesFormComponent],
})
export class SubunidadesComponent implements OnInit {
  protected data$!: Observable<Subunidades>;
  protected excluir!: Subunidade;
  protected dtOptions!: any;

  @ViewChild(SubunidadesFormComponent) child!: SubunidadesFormComponent;

  constructor(
    private subunidadesService:SubunidadesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.subunidadesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.subunidadesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Subunidade) {
    this.child.editar(data);
  }

  delete(data: Subunidade) {
    this.excluir = data;
  }

  confirm() {
    this.subunidadesService.remove(this.excluir.id || 0).subscribe({
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
