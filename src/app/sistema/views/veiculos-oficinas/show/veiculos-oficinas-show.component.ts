import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { Observable } from "rxjs";
import { VeiculoOficina } from "../veiculo-oficina";
import { VeiculosOficinasService } from "../veiculos-oficinas.service";

@Component({
    selector: 'app-veiculos-oficinas-show',
    templateUrl: './veiculos-oficinas-show.component.html',
    styleUrl: './veiculos-oficinas-show.component.css',
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
export class VeiculosOficinasShow implements OnInit, OnDestroy, OnChanges{

   @Input() veiculooficina!: VeiculoOficina;
   protected data$!: Observable<VeiculoOficina>;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private veiculoOficinaService: VeiculosOficinasService,
        private sessionService: SessionService,
    ){}
   
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('veiculos_oficinas');

        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['veiculooficina']) {
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
        if(this.veiculooficina.id){
            this.data$ = this.veiculoOficinaService.find(this.veiculooficina.id);
        }
    }

}