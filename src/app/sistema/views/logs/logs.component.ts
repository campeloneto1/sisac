import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Log, Logs } from './log';
import { LogsService } from './logs.service';
import { TitleComponent } from '../../components/title/title.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../session.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Observable } from 'rxjs';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
  standalone: true,
  imports: [
    CommonModule, 
    TitleComponent, 
    DataTablesModule,
    FormsModule
  ],
})
export class LogsComponent implements OnInit, OnDestroy {
  protected data$!: Observable<Logs>;
  protected excluir!: Log;
  protected pesquisa!: string;
  protected temp!: Logs;
  protected quant: number = 10;
  protected subscription: any;

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  protected dtOptions: Config = {};

  constructor(
    private logsService: LogsService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) {}
 

  ngOnInit(): void {
    this.sessionService.checkPermission('administrador');
    this.dtOptions = {
      pageLength: 10,
    };

    this.data$ = this.logsService.index();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  refresh() {
    this.data$ = this.logsService.index();
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

}