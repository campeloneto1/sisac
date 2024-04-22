import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ArmamentoTamanho, ArmamentosTamanhos } from './armamento-tamanho';
import { ArmamentosTamanhosService } from './armamentos-tamanhos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosTamanhosFormComponent } from './formulario/armamentos-tamanhos-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-armamentos-tamanhos',
  templateUrl: './armamentos-tamanhos.component.html',
  styleUrl: './armamentos-tamanhos.component.css',
  standalone: true,
  imports: [CommonModule, TitleComponent, ArmamentosTamanhosFormComponent],
})
export class ArmamentosTamanhosComponent implements OnInit {
  protected data$!: Observable<ArmamentosTamanhos>;
  protected excluir!: ArmamentoTamanho;
  protected dtOptions!: any;

  @ViewChild(ArmamentosTamanhosFormComponent) child!: ArmamentosTamanhosFormComponent;

  constructor(
    private armamentosTamanhosService: ArmamentosTamanhosService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.armamentosTamanhosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.armamentosTamanhosService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: ArmamentoTamanho) {
    this.child.editar(data);
  }

  delete(data: ArmamentoTamanho) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosTamanhosService.remove(this.excluir.id || 0).subscribe({
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
