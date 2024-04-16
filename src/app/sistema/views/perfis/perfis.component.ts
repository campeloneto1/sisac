import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Perfil, Perfis } from './perfil';
import { PerfisService } from './perfis.service';
import { TitleComponent } from '../../components/title/title.component';
import { PerfisFormComponent } from './formulario/perfis-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrl: './perfis.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, PerfisFormComponent],
})
export class PerfisComponent implements OnInit {
  protected data$!: Observable<Perfis>;
  protected excluir!: Perfil;
  protected dtOptions!: any;

  @ViewChild(PerfisFormComponent) child!: PerfisFormComponent;

  constructor(
    private perfisService: PerfisService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.perfisService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.perfisService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Perfil) {
    this.child.editar(data);
  }

  delete(data: Perfil) {
    this.excluir = data;
  }

  confirm() {
    this.perfisService.remove(this.excluir.id || 0).subscribe({
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
