import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Estado, Estados } from './estado';
import { EstadosService } from './estados.service';
import { TitleComponent } from '../../components/title/title.component';
import { EstadosFormComponent } from './formulario/estados-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, EstadosFormComponent],
})
export class EstadosComponent implements OnInit {
  protected data$!: Observable<Estados>;
  protected excluir!: Estado;
  protected dtOptions!: any;

  @ViewChild(EstadosFormComponent) child!: EstadosFormComponent;

  constructor(
    private estadosService: EstadosService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.estadosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.estadosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Estado) {
    this.child.editar(data);
  }

  delete(data: Estado) {
    this.excluir = data;
  }

  confirm() {
    this.estadosService.remove(this.excluir.id || 0).subscribe({
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
