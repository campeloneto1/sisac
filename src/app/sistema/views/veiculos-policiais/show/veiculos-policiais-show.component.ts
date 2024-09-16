import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { VeiculoPolicial } from "../veiculo-policial";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { Observable } from "rxjs";

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
export class VeiculosPoliciaisShow implements OnInit, OnDestroy, OnChanges{

   @Input() veiculopolicial!: VeiculoPolicial;
   protected data$!: Observable<VeiculoPolicial>;
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

        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['veiculopolicial']) {
            this.refresh();
          }
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    refresh(){
        if(this.veiculopolicial.id){
            this.data$ = this.veiculoPolicialService.find(this.veiculopolicial.id);
        }
    }

}