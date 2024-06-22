import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisAtestados, PolicialAtestado} from './policial-atestado';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisAtestadosFormComponent } from './formulario/policiais-atestados-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-policiais-atestados',
  templateUrl: './policiais-atestados.component.html',
  styleUrl: './policiais-atestados.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisAtestadosFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
        NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisAtestadosComponent implements OnInit, OnDestroy {
  protected data$!: PoliciaisAtestados;
  protected excluir!: PolicialAtestado;
  protected pesquisa!: string;
  protected temp!: PoliciaisAtestados;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PoliciaisAtestadosFormComponent) child!: PoliciaisAtestadosFormComponent;

  constructor(
    private policiaisAtestadosService: PoliciaisAtestadosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_atestados');
    this.subscription = this.policiaisAtestadosService.index().subscribe({
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
    this.policiaisAtestadosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: PolicialAtestado) {
    this.child.editar(data);
  }

  delete(data: PolicialAtestado) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisAtestadosService.remove(this.excluir.id || 0).subscribe({
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
        if(data.policial.numeral){
          return data.policial.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.graduacao.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
          || !pesq
        }else{
          return  data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.graduacao.abreviatura.toLocaleLowerCase().indexOf(pesq) !== -1 
          || !pesq
        }
        
      });
    }
  }

}