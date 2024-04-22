import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ArmamentoTipo, ArmamentosTipos } from './armamento-tipo';
import { ArmamentosTiposService } from './armamentos-tipos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosTiposFormComponent } from './formulario/armamentos-tipos-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-armamentos-tipos',
  templateUrl: './armamentos-tipos.component.html',
  styleUrl: './armamentos-tipos.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, ArmamentosTiposFormComponent],
})
export class ArmamentosTiposComponent implements OnInit {
  protected data$!: Observable<ArmamentosTipos>;
  protected excluir!: ArmamentoTipo;
  protected dtOptions!: any;

  @ViewChild(ArmamentosTiposFormComponent) child!: ArmamentosTiposFormComponent;

  constructor(
    private armamentosTiposService: ArmamentosTiposService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.armamentosTiposService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.armamentosTiposService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: ArmamentoTipo) {
    this.child.editar(data);
  }

  delete(data: ArmamentoTipo) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosTiposService.remove(this.excluir.id || 0).subscribe({
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
