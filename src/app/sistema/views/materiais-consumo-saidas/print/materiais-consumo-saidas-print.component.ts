import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MaterialConsumoSaida } from "../material-consumo-saida";
import { MateriaisConsumoSaidasService } from "../materiais-consumo-saidas.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";

@Component({
    selector: 'app-materiais-consumo-saidas-print',
    templateUrl: './materiais-consumo-saidas-print.component.html',
    styleUrl: './materiais-consumo-saidas-print.component.css',
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
export class MateriaisConsumoSaidasComponent implements OnInit, OnDestroy{

    protected data$!: MaterialConsumoSaida;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private materiaisConsumoSaidasService: MateriaisConsumoSaidasService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.id = this.activatedRoute.snapshot.params['id'];

       this.subscription =  this.materiaisConsumoSaidasService.find(this.id).subscribe({
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