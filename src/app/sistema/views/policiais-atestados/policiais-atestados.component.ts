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

  @ViewChild(PoliciaisAtestadosFormComponent) child!: PoliciaisAtestadosFormComponent;

  constructor(
    private policiaisAtestadosService: PoliciaisAtestadosService,
    private toastr: ToastrService,
  ) {}
 

  ngOnInit(): void {
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

  dataFinal(data: Date, dias:number): Date{
    let result = new Date(data);
    result.setDate(result.getDate() + dias);
    return result;
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
        || data.cid?.toLocaleLowerCase().indexOf(pesq) !== -1 
        || !pesq
      });
    }
  }

}