import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoliciaisRequeridas, PolicialRequerida} from './policial-requerida';
import { PoliciaisRequeridasService } from './policiais-requeridas.service';
import { TitleComponent } from '../../components/title/title.component';
import { PoliciaisRequeridasFormComponent } from './formulario/policiais-requeridas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
@Component({
  selector: 'app-policiais-requeridas',
  templateUrl: './policiais-requeridas.component.html',
  styleUrl: './policiais-requeridas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    PoliciaisRequeridasFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class PoliciaisRequeridasComponent implements OnInit, OnDestroy {
  protected data$!: PoliciaisRequeridas;
  protected excluir!: PolicialRequerida;
  protected pesquisa!: string;
  protected temp!: PoliciaisRequeridas;
  protected quant: number = 10;
  protected subscription: any;

  protected user!: User;

  @ViewChild(PoliciaisRequeridasFormComponent) child!: PoliciaisRequeridasFormComponent;

  constructor(
    private PoliciaisRequeridasService: PoliciaisRequeridasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('policiais_requeridas');
    this.subscription = this.PoliciaisRequeridasService.index().subscribe({
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
    this.PoliciaisRequeridasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: PolicialRequerida) {
    this.child.editar(data);
  }

  delete(data: PolicialRequerida) {
    this.excluir = data;
  }

  confirm() {
    this.PoliciaisRequeridasService.remove(this.excluir.id || 0).subscribe({
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
        if(data.nup){
            return data.policial.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.nup?.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }else{
            return data.policial.numeral?.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.nome_guerra.toLocaleLowerCase().indexOf(pesq) !== -1 
            || data.policial.matricula.toLocaleLowerCase().indexOf(pesq) !== -1 
            || !pesq
        }
      });
    }
    
  }

}