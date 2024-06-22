import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisPublicacoes, PolicialPublicacao} from './policial-publicacao';
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisPublicacoesFormComponent } from './formulario/policiais-publicacoes-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
@Component({
  selector: 'app-policiais-publicacoes',
  templateUrl: './policiais-publicacoes.component.html',
  styleUrl: './policiais-publicacoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisPublicacoesFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisPublicacoesComponent implements OnInit, OnDestroy {
  protected data$!: PoliciaisPublicacoes;
  protected excluir!: PolicialPublicacao;
  protected pesquisa!: string;
  protected temp!: PoliciaisPublicacoes;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PoliciaisPublicacoesFormComponent) child!: PoliciaisPublicacoesFormComponent;

  constructor(
    private policiaisPublicacoesService: PoliciaisPublicacoesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_publicacoes');
    this.subscription = this.policiaisPublicacoesService.index().subscribe({
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
    this.policiaisPublicacoesService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
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

  pesquisar(){
    this.data$ = this.temp;
    if(this.pesquisa.length > 0){
      var pesq = this.pesquisa.toLocaleLowerCase();
      this.data$ = this.data$.filter((data) => {
        if(data.policial.numeral){
          return data.policial.numeral.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1
          || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.publicacao_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
          || data.boletim
          || !pesq
        }else{
            return data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.graduacao.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.publicacao_tipo.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.boletim
            || !pesq
        }
      });
    }
    
  }

}