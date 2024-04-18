import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PolicialFerias, PoliciaisFerias } from './policial-ferias';
import { PoliciaisFeriasService } from './policiais-ferias.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisFeriasFormComponent } from './formulario/policiais-ferias-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-policiais-ferias',
  templateUrl: './policiais-ferias.component.html',
  styleUrl: './policiais-ferias.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, PoliciaisFeriasFormComponent],
})
export class PoliciaisFeriasComponent implements OnInit {
  protected data$!: Observable<PoliciaisFerias>;
  protected excluir!: PolicialFerias;
  protected dtOptions!: any;

  @ViewChild(PoliciaisFeriasFormComponent) child!: PoliciaisFeriasFormComponent;

  constructor(
    private policiaisFeriasService: PoliciaisFeriasService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.policiaisFeriasService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.policiaisFeriasService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: PolicialFerias) {
    this.child.editar(data);
  }

  delete(data: PolicialFerias) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisFeriasService.remove(this.excluir.id || 0).subscribe({
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
