import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Marca, Marcas } from './marca';
import { MarcasService } from './marcas.service';
import { TitleComponent } from '../../components/title/title.component';
import { MarcasFormComponent } from './formulario/marcas-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, MarcasFormComponent],
})
export class MarcasComponent implements OnInit {
  protected data$!: Observable<Marcas>;
  protected excluir!: Marca;
  protected dtOptions!: any;

  @ViewChild(MarcasFormComponent) child!: MarcasFormComponent;

  constructor(
    private marcasService: MarcasService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.marcasService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.marcasService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable({...this.dtOptions, destroy: true  });
        }, 1);
      })
    );
  }

  editar(data: Marca) {
    this.child.editar(data);
  }

  delete(data: Marca) {
    this.excluir = data;
  }

  confirm() {
    this.marcasService.remove(this.excluir.id || 0).subscribe({
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
