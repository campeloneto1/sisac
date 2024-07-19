import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MaterialConsumoEntrada } from "../material-consumo-entrada";
import { MateriaisConsumoEntradasService } from "../materiais-consumo-entradas.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";

@Component({
    selector: 'app-materiais-consumo-entradas-print',
    templateUrl: './materiais-consumo-entradas-print.component.html',
    styleUrl: './materiais-consumo-entradas-print.component.css',
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
export class MateriaisConsumoEntradasComponent implements OnInit, OnDestroy{

    protected data$!: MaterialConsumoEntrada;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private materiaisConsumoEntradasService: MateriaisConsumoEntradasService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('materiais_consumo_entradas');
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.materiaisConsumoEntradasService.find(this.id).subscribe({
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
        catch(e:any){
            this.sessionService.redirect()
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

}