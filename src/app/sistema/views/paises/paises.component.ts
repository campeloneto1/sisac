import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Pais, Paises } from './pais';
import { PaisesService } from './paises.service';
import { TitleComponent } from '../../components/title/title.component';
import { PaisesFormComponent } from './formulario/paises-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, PaisesFormComponent],
})
export class PaisesComponent implements OnInit {
  protected data$!: Observable<Paises>;
  protected excluir!: Pais;
  protected dtOptions!: any;

  @ViewChild(PaisesFormComponent) child!: PaisesFormComponent;

  constructor(
    private paisesService:PaisesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.paisesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.paisesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Pais) {
    this.child.editar(data);
  }

  delete(data: Pais) {
    this.excluir = data;
  }

  confirm() {
    this.paisesService.remove(this.excluir.id || 0).subscribe({
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
