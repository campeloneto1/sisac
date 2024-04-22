import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ArmamentoCalibre, ArmamentosCalibres } from './armamento-calibre';
import { ArmamentosCalibresService } from './armamentos-calibres.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosCalibresFormComponent } from './formulario/armamentos-calibres-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-armamentos-calibres',
  templateUrl: './armamentos-calibres.component.html',
  styleUrl: './armamentos-calibres.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, ArmamentosCalibresFormComponent],
})
export class ArmamentosCalibresComponent implements OnInit {
  protected data$!: Observable<ArmamentosCalibres>;
  protected excluir!: ArmamentoCalibre;
  protected dtOptions!: any;

  @ViewChild(ArmamentosCalibresFormComponent) child!: ArmamentosCalibresFormComponent;

  constructor(
    private armamentosCalibresService: ArmamentosCalibresService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.armamentosCalibresService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.armamentosCalibresService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: ArmamentoCalibre) {
    this.child.editar(data);
  }

  delete(data: ArmamentoCalibre) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosCalibresService.remove(this.excluir.id || 0).subscribe({
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
