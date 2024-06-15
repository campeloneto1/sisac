import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Contrato } from "../contrato";
import { ContratosService } from "../contratos.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";

@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrl: './contrato.component.css',
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
export class ContratoComponent implements OnInit, OnDestroy{

    protected contrato!: Contrato;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    constructor(
        private contratosService: ContratosService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('contratos');
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.contratosService.find(this.id).subscribe({
            next: (data) => {
                if(!data){this.sessionService.redirect()}
                this.contrato = data;
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