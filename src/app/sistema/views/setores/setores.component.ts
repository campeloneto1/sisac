import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Setor, Setores } from './setor';
import { SetoresService } from './setores.service';
import { TitleComponent } from '../../components/title/title.component';
import { SetoresFormComponent } from './formulario/setores-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrl: './setores.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, SetoresFormComponent],
})
export class SetoresComponent implements OnInit {
  protected data$!: Observable<Setores>;
  protected excluir!: Setor;
  protected dtOptions!: any;

  @ViewChild(SetoresFormComponent) child!: SetoresFormComponent;

  constructor(
    private setoresService:SetoresService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.setoresService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.setoresService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Setor) {
    this.child.editar(data);
  }

  delete(data: Setor) {
    this.excluir = data;
  }

  confirm() {
    this.setoresService.remove(this.excluir.id || 0).subscribe({
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
