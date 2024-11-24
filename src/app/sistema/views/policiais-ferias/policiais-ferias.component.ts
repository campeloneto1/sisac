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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-policiais-ferias',
  templateUrl: './policiais-ferias.component.html',
  styleUrl: './policiais-ferias.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisFeriasFormComponent,
    DataTablesModule,
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
  protected data$!: Observable<PoliciaisFerias>;
  protected excluir!: PolicialFerias;
  protected pesquisa!: string;
  protected temp!: PoliciaisFerias;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;
  protected params!: any; 

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(PoliciaisFeriasFormComponent) child!: PoliciaisFeriasFormComponent;

  constructor(
    private policiaisFeriasService: PoliciaisFeriasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_ferias');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [0, 'desc']};

    this.route.queryParamMap.subscribe(params => {
     
      if (params.has('ativo')) {
        this.params = {ativo:params.get('ativo')};
      }
    });


    this.data$ = this.policiaisFeriasService.index(this.params);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.policiaisFeriasService.index(this.params);
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

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}