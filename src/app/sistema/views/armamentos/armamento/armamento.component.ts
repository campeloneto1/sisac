import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Armamento } from "../armamento";
import { ArmamentosService } from "../armamentos.service";
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";

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
        DataTableModule
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

    constructor(
        private armamentosService: ArmamentosService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('armamentos');
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.armamentosService.find(this.id).subscribe({
            next: (data) => {
                this.armamento = data;
            }
        });
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
}