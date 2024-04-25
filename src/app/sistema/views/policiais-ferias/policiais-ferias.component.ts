import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisFerias, PolicialFerias } from './policial-ferias';
import { PoliciaisFeriasService } from './policiais-ferias.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisFeriasFormComponent } from './formulario/policiais-ferias-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-policiais-ferias',
  templateUrl: './policiais-ferias.component.html',
  styleUrl: './policiais-ferias.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisFeriasFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    RouterModule
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisFeriasComponent implements OnInit, OnDestroy {
  protected data$!: PoliciaisFerias;
  protected excluir!: PolicialFerias;
  protected pesquisa!: string;
  protected temp!: PoliciaisFerias;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PoliciaisFeriasFormComponent) child!: PoliciaisFeriasFormComponent;

  constructor(
    private policiaisFeriasService: PoliciaisFeriasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_ferias');
    this.subscription = this.policiaisFeriasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
        this.temp = data;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.policiaisFeriasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: PolicialFerias) {
    this.child.editar(data);
  }

  delete(data: PolicialFerias) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisFeriasService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        return data.policial.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.boletim?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
    
  }

}