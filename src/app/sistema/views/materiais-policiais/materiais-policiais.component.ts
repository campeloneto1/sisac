import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SessionService } from '../../session.service';
import { User } from '../users/user';
import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';
import { RouterModule } from '@angular/router';
import { MateriaisPoliciaisFormComponent } from './formulario/materiais-policiais-form.component';
import { MateriaisPoliciaisFormReceberComponent } from './formulario-receber/materiais-policiais-form-receber.component';
import { MateriaisPoliciaisItensFormComponent } from '../materiais-policiais-itens/formulario/materiais-policiais-itens-form.component';
import { MateriaisPoliciais, MaterialPolicial } from './material-policial';
import { MateriaisPoliciaisService } from './materiais-policiais.service';
import { MateriaisPoliciaisItensService } from '../materiais-policiais-itens/materiais-policiais-itens.service';
import { SharedService } from '../../shared/shared.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-materiais-policiais',
  templateUrl: './materiais-policiais.component.html',
  styleUrl: './materiais-policiais.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    MateriaisPoliciaisFormComponent,
    MateriaisPoliciaisFormReceberComponent,
    MateriaisPoliciaisItensFormComponent,
    DataTablesModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    InputTextareaComponent,
    RouterModule
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class MateriaisPoliciaisComponent implements OnInit, OnDestroy {
  protected data$!: Observable<MateriaisPoliciais>;
  protected excluir!: MaterialPolicial;
  protected pesquisa!: string;
  protected temp!: MateriaisPoliciais;
  protected quant: number = 10;
  protected subscription: any;
  protected materialPolicial!: MaterialPolicial;

  protected cadastrando: boolean = false;

  protected caditem:boolean = false;

  protected user!: User;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  @ViewChild(MateriaisPoliciaisFormComponent) child!: MateriaisPoliciaisFormComponent;
  @ViewChild(MateriaisPoliciaisFormReceberComponent) childreceber!: MateriaisPoliciaisFormReceberComponent;
  @ViewChild(MateriaisPoliciaisItensFormComponent) childarmamento!: MateriaisPoliciaisItensFormComponent;

  constructor(
    private materiaisPoliciaisService: MateriaisPoliciaisService,
    private materiaisPoliciaisItensService: MateriaisPoliciaisItensService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private sharedService: SharedService
  ) {}
 

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.sessionService.checkPermission('materiais_policiais');
    this.dtOptions = this.sharedService.getDtOptions();
    this.dtOptions =  {...this.dtOptions, order: [0, 'desc']};

    this.data$ = this.materiaisPoliciaisService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.materiaisPoliciaisService.index();
  }


  editar(data: MaterialPolicial) {
    this.cadastrando = false;
    setTimeout(() => {
      this.cadastrando = true;
    }, 100);
    setTimeout(() => {
      this.child.editar(data);
    }, 200);
    

  }

  cadastrar(){
    this.cadastrando = false;
    setTimeout(() => {
      this.cadastrando = true;
    }, 100);
    setTimeout(() => {
      this.child.reset();
    }, 200);
  }

  delete(data: MaterialPolicial) {
    this.excluir = data;
  }

  confirm() {
    this.materiaisPoliciaisService.remove(this.excluir.id || 0).subscribe({
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

  showItens(data: MaterialPolicial){
    this.caditem = false;
    this.materiaisPoliciaisService.find(data.id || 0).subscribe({
      next: (data) => {
        this.materialPolicial = data;
      }
    })
    
  }

  refreshItens(){
    this.caditem = false;
    this.materiaisPoliciaisService.find(this.materialPolicial.id || 0).subscribe({
      next: (data) => {
        this.materialPolicial = data;
      }
    });
  }

  rmvItem(id: number){
    if(window.confirm("Tem certeza que deseja excluir o item?")){
      this.materiaisPoliciaisItensService.remove(id).subscribe({
        next: (data) => {
          this.materiaisPoliciaisService.find(this.materialPolicial.id || 0).subscribe({
            next: (data) => {
              this.materialPolicial = data;
            }
          });
        }
      });
    }
   
  }

  cancelItem(){
    this.caditem = false;
  }

  devolver(data:MaterialPolicial){
    this.materiaisPoliciaisService.find(data.id || 0).subscribe({
      next: (data) => {
        this.materialPolicial = data;
      }
    })
  }

}