import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Armamento } from "../armamento";
import { ArmamentosService } from "../armamentos.service";
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";
import { ArmamentoEmprestimo } from "../../armamentos-emprestimos/armamento-emprestimo";
import { ArmamentoEmprestimoItem } from "../../armamentos-emprestimos-itens/armamento-emprestimo-item";
import { ArmamentosEmprestimosShow } from "../../armamentos-emprestimos/show/armamentos-emprestimos-show.component";

@Component({
    selector: 'app-armamento',
    templateUrl: './armamento.component.html',
    styleUrl: './armamento.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
        DataTablesModule,
        ArmamentosEmprestimosShow
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class ArmamentoComponent implements OnInit, OnDestroy{

    protected armamento!: Armamento;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    protected armEmrpestimo!: ArmamentoEmprestimo;

    @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
    protected dtOptions: Config = {};

    constructor(
        private armamentosService: ArmamentosService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('armamentos');
        this.dtOptions = {
            pageLength: 10,
            order: [0, 'desc']
        };

        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.armamentosService.find(this.id).subscribe({
                next: (data) => {
                    if(!data){this.sessionService.redirect()}
                    this.armamento = data;
                }
            });
        }
        catch(e:any){
            this.sessionService.redirect()
        }

        
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    dataFinal(data: Date, dias:number): Date{
        let result = new Date(data);
        result.setDate(result.getDate() + dias);
        return result;
      }


      showEmprestado(data: ArmamentoEmprestimoItem){
        this.armEmrpestimo = data.armamento_emprestimo;
      }
}