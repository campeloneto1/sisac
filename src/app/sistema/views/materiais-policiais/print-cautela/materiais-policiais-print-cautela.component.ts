import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { MaterialPolicial } from "../material-policial";
import { MateriaisPoliciaisService } from "../materiais-policiais.service";

@Component({
    selector: 'app-materiais-policiais-print-cautela',
    templateUrl: './materiais-policiais-print-cautela.component.html',
    styleUrl: './materiais-policiais-print-cautela.component.css',
    standalone: true,
    imports: [
        CommonModule,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class MateriaisPoliciaisPrintCautela implements OnInit, OnDestroy{

    protected data$!: MaterialPolicial;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private materialPolicialService: MateriaisPoliciaisService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.materialPolicialService.find(this.id).subscribe({
            next: (data) => {
                this.data$ = data;
            }
        });

        this.subscription2 =  this.subunidadesService.find(this.user.subunidade.id || 0).subscribe({
            next: (data) => {
                this.subunidade = data;
            }
        })
    }
    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

}