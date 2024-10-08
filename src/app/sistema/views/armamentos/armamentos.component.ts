import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Armamento, Armamentos } from './armamento';
import { ArmamentosService } from './armamentos.service';
import { TitleComponent } from '../../components/title/title.component';
import { ArmamentosFormComponent } from './formulario/armamentos-form.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { User } from '../users/user';
import { SessionService } from '../../session.service';
import { RouterModule } from '@angular/router';
import { ArmamentosFormQuantidadeComponent } from './formulario-quantidade/armamentos-form-quantidade.component';
import { ArmamentosFormAjusteComponent } from './formulario-ajuste/armamentos-form-ajuste.component';
import { SharedService } from '../../shared/shared.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-armamentos',
  templateUrl: './armamentos.component.html',
  styleUrl: './armamentos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    ArmamentosFormComponent,
    ArmamentosFormQuantidadeComponent,
    ArmamentosFormAjusteComponent,
    FormsModule,
    RouterModule,
    DataTablesModule
  ],
})
export class ArmamentosComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Armamentos>;
  protected excluir!: Armamento;
  protected pesquisa!: string;
  protected temp!: Armamentos;
  protected quant: number = 10;
  protected subscription: any;
  protected ajustarm!: Armamento;
  protected altarm!: Armamento;
  protected user!: User;
  protected cadastrando:boolean = false;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(ArmamentosFormComponent) child!: ArmamentosFormComponent;
  @ViewChild(ArmamentosFormQuantidadeComponent) childQuant!: ArmamentosFormQuantidadeComponent;
  @ViewChild(ArmamentosFormAjusteComponent) childAjuste!: ArmamentosFormAjusteComponent;

  constructor(
    private armamentosService: ArmamentosService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('armamentos');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [6, 'asc']};
    
    this.data$ = this.armamentosService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.cadastrando = false;
    this.data$ = this.armamentosService.index();
  }

  cadastrar(){
    this.cadastrando = true;
    setTimeout(() => {
      this.child.resetForm();
    }, 100);
  }

  cancel(){
    this.cadastrando = false;
  }

  editar(data: Armamento) {
    this.cadastrando = true;
    setTimeout(() => {
      this.child.editar(data);
    }, 100);
   
  }

  delete(data: Armamento) {
    this.excluir = data;
  }

  confirm() {
    this.armamentosService.remove(this.excluir.id || 0).subscribe({
      next: (data: any) => {
        this.toastr.success('Exclusão realizada com sucesso!');
        this.refresh();
      },
      error: (error: any) => {
        this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
      },
    });
  }

  ajustquant(data: Armamento){
    
   this.ajustarm = data;
  }

  altquant(data: Armamento){
   
    this.altarm = data;
   }

  encodeId(id: any){
    var encoded = this.sharedService.encodeId(id);
    return encoded;
  }

}