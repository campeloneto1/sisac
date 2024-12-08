import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisDiarias, PolicialDiaria } from './policial-diaria';
import { PoliciaisDiariasService } from './policiais-diarias.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisDiariasFormComponent } from './formulario/policiais-diarias-form.component';
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
  selector: 'app-policiais-diarias',
  templateUrl: './policiais-diarias.component.html',
  styleUrl: './policiais-diarias.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisDiariasFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisDiariasComponent implements OnInit, OnDestroy {
  protected data$!: Observable<PoliciaisDiarias>;
  protected excluir!: PolicialDiaria;
  protected pesquisa!: string;
  protected temp!: PoliciaisDiarias;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;
  protected params!: any; 

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisDiariasFormComponent) child!: PoliciaisDiariasFormComponent;

  constructor(
    private policiaisDiariasService: PoliciaisDiariasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_diarias');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [0, 'desc']};

    this.route.queryParamMap.subscribe(params => {
     
      if (params.has('ativo')) {
        this.params = {ativo:params.get('ativo')};
      }
    });

    this.data$ = this.policiaisDiariasService.index(this.params);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisDiariasService.index(this.params);
  }

  editar(data: PolicialDiaria) {
    this.child.editar(data);
  }

  delete(data: PolicialDiaria) {
    this.excluir = data;
  }

  confirm() {
    this.policiaisDiariasService.remove(this.excluir.id || 0).subscribe({
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