import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Modelo, Modelos } from './modelo';
import { ModelosService } from './modelos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ModelosFormComponent } from './formulario/modelos-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, ModelosFormComponent],
})
export class ModelosComponent implements OnInit {
  protected data$!: Observable<Modelos>;
  protected excluir!: Modelo;
  protected dtOptions!: any;

  @ViewChild(ModelosFormComponent) child!: ModelosFormComponent;

  constructor(
    private modelosService: ModelosService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.modelosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.modelosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Modelo) {
    this.child.editar(data);
  }

  delete(data: Modelo) {
    this.excluir = data;
  }

  confirm() {
    this.modelosService.remove(this.excluir.id || 0).subscribe({
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
