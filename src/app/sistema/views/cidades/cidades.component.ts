import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cidade, Cidades } from './cidade';
import { CidadesService } from './cidades.service';
import { TitleComponent } from '../../components/title/title.component';
import { CidadesFormComponent } from './formulario/cidades-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrl: './cidades.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, CidadesFormComponent],
})
export class CidadesComponent implements OnInit {
  protected data$!: Observable<Cidades>;
  protected excluir!: Cidade;
  protected dtOptions!: any;

  @ViewChild(CidadesFormComponent) child!: CidadesFormComponent;

  constructor(
    private cidadesService: CidadesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.cidadesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.cidadesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Cidade) {
    this.child.editar(data);
  }

  delete(data: Cidade) {
    this.excluir = data;
  }

  confirm() {
    this.cidadesService.remove(this.excluir.id || 0).subscribe({
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
