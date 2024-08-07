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
}