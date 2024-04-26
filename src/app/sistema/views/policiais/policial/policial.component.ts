import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Policial } from "../policial";
import { PoliciaisService } from "../policiais.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";

@Component({
    selector: 'app-policial',
    templateUrl: './policial.component.html',
    styleUrl: './policial.component.css',
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
export class PolicialComponent implements OnInit, OnDestroy{

    protected policial!: Policial;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    constructor(
        private policiaisService: PoliciaisService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.policiaisService.find(this.id).subscribe({
            next: (data) => {
                this.policial = data;
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