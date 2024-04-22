import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Armamento, Armamentos } from './armamento';
import { ArmamentosService } from './armamentos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosFormComponent } from './formulario/armamentos-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-armamentos',
  templateUrl: './armamentos.component.html',
  styleUrl: './armamentos.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, ArmamentosFormComponent],
})
export class ArmamentosComponent implements OnInit {
  protected data$!: Observable<Armamentos>;
  protected excluir!: Armamento;
  protected dtOptions!: any;

  @ViewChild(ArmamentosFormComponent) child!: ArmamentosFormComponent;

  constructor(
    private armamentosService: ArmamentosService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.armamentosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.armamentosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Armamento) {
    this.child.editar(data);
  }

  delete(data: Armamento) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosService.remove(this.excluir.id || 0).subscribe({
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
