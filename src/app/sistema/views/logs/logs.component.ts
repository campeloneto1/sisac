import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Log, Logs } from './log';
import { LogsService } from './logs.service';
import { TitleComponent } from '../../components/title/title.component';
import { ToastrService } from 'ngx-toastr';
import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    DataTableModule,
    FormsModule
  ],
})
export class LogsComponent implements OnInit, OnDestroy {
  protected data$!: Logs;
  protected excluir!: Log;
  protected pesquisa!: string;
  protected temp!: Logs;
  protected quant: number = 10;
  protected subscription: any;

  constructor(
    private logsService: LogsService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.subscription = this.logsService.index().subscribe({
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
    this.logsService.index().subscribe({
      next: (data) => {
        this.data$ = data;
      }
    });
  }

  delete(data: Log) {
    this.excluir = data;
  }

  confirm() {
    this.logsService.remove(this.excluir.id || 0).subscribe({
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
        return data.mensagem.toLocaleLowerCase().indexOf(pesq) !== -1 
        || data.table?.toLocaleLowerCase().indexOf(pesq) !== -1
        || !pesq
      });
    }
  }

}