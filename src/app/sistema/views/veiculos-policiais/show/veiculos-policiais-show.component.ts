import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { VeiculoPolicial } from "../veiculo-policial";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";

@Component({
    selector: 'app-veiculos-policiais-show',
    templateUrl: './veiculos-policiais-show.component.html',
    styleUrl: './veiculos-policiais-show.component.css',
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
export class VeiculosPoliciaisShow implements OnInit, OnDestroy{

   @Input() data$!: VeiculoPolicial;
    
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private veiculoPolicialService: VeiculosPoliciaisService,
        private sessionService: SessionService,
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('veiculos_policiais');
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