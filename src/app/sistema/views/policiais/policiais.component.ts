import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Policial, Policiais } from './policial';
import { PoliciaisService } from './policiais.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisFormComponent } from './formulario/policiais-form.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/shared.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-policiais',
  templateUrl: './policiais.component.html',
  styleUrl: './policiais.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisFormComponent,
    NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class PoliciaisComponent implements OnInit {
  protected data$!: Observable<Policiais>;
  protected excluir!: Policial;
  protected dtOptions!: any;

  @ViewChild(PoliciaisFormComponent) child!: PoliciaisFormComponent;

  constructor(
    private policiaisService:PoliciaisService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dtOptions = this.sharedService.getDtOptions();
    this.data$ = this.policiaisService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  refresh() {
    this.data$ = this.policiaisService.index().pipe(
      tap(() => {
        setTimeout(() => {
          $('#datatableexample').DataTable().destroy();
          $('#datatableexample').DataTable(this.dtOptions);
        }, 1);
      })
    );
  }

  editar(data: Policial) {
    this.child.editar(data);
  }

  delete(data: Policial) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisService.remove(this.excluir.id || 0).subscribe({
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
