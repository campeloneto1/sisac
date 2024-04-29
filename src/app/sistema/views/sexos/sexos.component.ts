import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Sexo, Sexos } from './sexo';
import { SexosService } from './sexos.service';
import { TitleComponent } from '../../components/title/title.component';
import { SexosFormComponent } from './formulario/sexos-form.component';
import { ToastrService } from 'ngx-toastr';
//import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import { SessionService } from '../../session.service';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { OpcoesTableComponent } from '../../components/opcoes-table/opcoes-table.component';
@Component({
  selector: 'app-sexos',
  templateUrl: './sexos.component.html',
  styleUrl: './sexos.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    SexosFormComponent,
    DataTablesModule,
    FormsModule
  ],
})
export class SexosComponent implements OnInit, OnDestroy, AfterViewInit {
  protected data$!: Sexos;
  protected excluir!: Sexo;
  protected pesquisa!: string;
  protected temp!: Sexos;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(SexosFormComponent) child!: SexosFormComponent;

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  @ViewChild('opcoestable') opcoestable!: TemplateRef<OpcoesTableComponent>;
  message = '';

  constructor(
    private sexosService: SexosService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    
    this.subscription = this.sexosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
        this.temp = data;
        

        setTimeout(() => {
          const self = this;
          this.dtOptions = {
            ajax: this.data$ as any,
            columns: [
              {
                title: '#',
                data: 'id'
              },
              {
                title: 'Nome',
                data: 'nome',
              },              
              {
                title: 'Opções',
                data: null,
                defaultContent: '',
                ngTemplateRef: {
                  ref: this.opcoestable,
                  context: {
                    // needed for capturing events inside <ng-template>
                    captureEvents: self.onCaptureEvent.bind(self)
                  }
                }
              }
            ]
          };
        });

      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // race condition fails unit tests if dtOptions isn't sent with dtTrigger
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  onCaptureEvent(event: any) {
    console.log(event)
  }

  refresh() {
    this.sexosService.index().subscribe({
      next: (data) => {
        this.data$ = data;
        
      }
    });
  }

  editar(data: Sexo) {
    this.child.editar(data);
  }

  delete(data: Sexo) {
    this.excluir = data;
  }

  confirm() {
    this.sexosService.remove(this.excluir.id || 0).subscribe({
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