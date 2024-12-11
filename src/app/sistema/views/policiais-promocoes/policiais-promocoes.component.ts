import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisPromocoes, PolicialPromocao } from './policial-promocao';
import { PoliciaisPromocoesService } from './policiais-promocoes.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisPromocoesFormComponent } from './formulario/policiais-promocoes-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
import { SharedService } from '../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-policiais-promocoes',
  templateUrl: './policiais-promocoes.component.html',
  styleUrl: './policiais-promocoes.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisPromocoesFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisPromocoesComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PoliciaisPromocoes>;
  protected excluir!: PolicialPromocao;
  protected pesquisa!: string;
  protected temp!: PoliciaisPromocoes;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;
  protected params!: any; 

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisPromocoesFormComponent) child!: PoliciaisPromocoesFormComponent;

  constructor(
    private policiaisPromocoesService: PoliciaisPromocoesService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [0, 'desc']};

    this.route.queryParamMap.subscribe(params => {
     
      if (params.has('ativo')) {
        this.params = {ativo:params.get('ativo')};
      }
    });

    this.data$ = this.policiaisPromocoesService.index(this.params);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisPromocoesService.index(this.params);
  }

  editar(data: PolicialPromocao) {
    this.child.editar(data);
  }

  delete(data: PolicialPromocao) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisPromocoesService.remove(this.excluir.id || 0).subscribe({
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