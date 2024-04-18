import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PublicacaoTipo, PublicacoesTipos } from './publicacao-tipo';
import { PublicacoesTiposService } from './publicacoes-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { PublicacoesTiposFormComponent } from './formulario/publicacoes-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-publicacoes-tipos',
  templateUrl: './publicacoes-tipos.component.html',
  styleUrl: './publicacoes-tipos.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, PublicacoesTiposFormComponent],
})
export class PublicacoesTiposComponent implements OnInit {
  protected data$!: Observable<PublicacoesTipos>;
  protected excluir!: PublicacaoTipo;
  protected dtOptions!: any;

  @ViewChild(PublicacoesTiposFormComponent) child!: PublicacoesTiposFormComponent;

  constructor(
    private publicacoesTiposService: PublicacoesTiposService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.publicacoesTiposService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.publicacoesTiposService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: PublicacaoTipo) {
    this.child.editar(data);
  }

  delete(data: PublicacaoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.publicacoesTiposService.remove(this.excluir.id || 0).subscribe({
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
