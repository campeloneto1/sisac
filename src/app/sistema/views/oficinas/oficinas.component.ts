import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Oficina, Oficinas } from './oficina';
import { OficinasService } from './oficinas.service';
import { TitleComponent } from '../../components/title/title.component';
import { OficinasFormComponent } from './formulario/oficinas-form.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrl: './oficinas.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    OficinasFormComponent,
    DataTableModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class OficinasComponent implements OnInit, OnDestroy {
  protected data$!: Oficinas;
  protected excluir!: Oficina;
  protected pesquisa!: string;
  protected temp!: Oficinas;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(OficinasFormComponent) child!: OficinasFormComponent;

  constructor(
    private oficinasService: OficinasService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('gestor');
    this.subscription = this.oficinasService.index().subscribe({
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
    this.oficinasService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  editar(data: Oficina) {
    this.child.editar(data);
  }

  delete(data: Oficina) {
    this.excluir = data;
  }

  confirm() {
    this.oficinasService.remove(this.excluir.id || 0).subscribe({
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
        return data.nome.toLocaleLowerCase().indexOf(pesq) !== -1         
        || !pesq
      });
    }    
  }

}