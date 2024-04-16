import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Sexo, Sexos } from './sexo';
import { SexosService } from './sexos.service';
import { TitleComponent } from '../../components/title/title.component';
import { SexosFormComponent } from './formulario/sexos-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-sexos',
  templateUrl: './sexos.component.html',
  styleUrl: './sexos.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, SexosFormComponent],
})
export class SexosComponent implements OnInit {
  protected data$!: Observable<Sexos>;
  protected excluir!: Sexo;
  protected dtOptions!: any;

  @ViewChild(SexosFormComponent) child!: SexosFormComponent;

  constructor(
    private sexosService: SexosService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.sexosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.sexosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Sexo) {
    this.child.editar(data);
  }

  delete(data: Sexo) {
    this.excluir = data;
  }

  confirm() {
    this.sexosService.remove(this.excluir.id || 0).subscribe({
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
