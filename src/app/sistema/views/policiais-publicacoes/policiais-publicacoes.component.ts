import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PoliciaisPublicacoes, PolicialPublicacao } from './policial-publicacao';
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisPublicacoesFormComponent } from './formulario/policiais-publicacoes-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-policiais-publicacoes',
  templateUrl: './policiais-publicacoes.component.html',
  styleUrl: './policiais-publicacoes.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, PoliciaisPublicacoesFormComponent],
})
export class PoliciaisPublicacoesComponent implements OnInit {
  protected data$!: Observable<PoliciaisPublicacoes>;
  protected excluir!: PolicialPublicacao;
  protected dtOptions!: any;

  @ViewChild(PoliciaisPublicacoesFormComponent) child!: PoliciaisPublicacoesFormComponent;

  constructor(
    private policiaisPublicacoesService: PoliciaisPublicacoesService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.policiaisPublicacoesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.policiaisPublicacoesService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: PolicialPublicacao) {
    this.child.editar(data);
  }

  delete(data: PolicialPublicacao) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisPublicacoesService.remove(this.excluir.id || 0).subscribe({
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
