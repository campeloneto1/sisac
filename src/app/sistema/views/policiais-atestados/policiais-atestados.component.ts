import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PoliciaisAtestados, PolicialAtestado } from './policial-atestado';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisAtestadosFormComponent } from './formulario/policiais-atestados-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-policiais-atestados',
  templateUrl: './policiais-atestados.component.html',
  styleUrl: './policiais-atestados.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, PoliciaisAtestadosFormComponent],
})
export class PoliciaisAtestadosComponent implements OnInit {
  protected data$!: Observable<PoliciaisAtestados>;
  protected excluir!: PolicialAtestado;
  protected dtOptions!: any;

  @ViewChild(PoliciaisAtestadosFormComponent) child!: PoliciaisAtestadosFormComponent;

  constructor(
    private policiaisAtestadosService: PoliciaisAtestadosService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.policiaisAtestadosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.policiaisAtestadosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: PolicialAtestado) {
    this.child.editar(data);
  }

  delete(data: PolicialAtestado) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisAtestadosService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  dataFinal(data: Date, dias:number): Date{
    let result = new Date(data);
    result.setDate(result.getDate() + dias);
    return result;
  }
}
