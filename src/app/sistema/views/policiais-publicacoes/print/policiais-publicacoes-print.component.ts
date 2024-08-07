import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { PoliciaisPublicacoesService } from "../policiais-publicacoes.service";
import { PolicialPublicacao, PoliciaisPublicacoes } from "../policial-publicacao";
import { PoliciaisService } from "../../policiais/policiais.service";
import { Policial } from "../../policiais/policial";

@Component({
    selector: 'app-policiais-publicacoes-print',
    templateUrl: './policiais-publicacoes-print.component.html',
    styleUrl: './policiais-publicacoes-print.component.css',
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
export class PoliciaisPublicacoesPrintComponent implements OnInit, OnDestroy{

    protected data$!: PoliciaisPublicacoes;
    protected policial!: Policial;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;
    private subscription3: any;

    constructor(
        private policiaisPublicacoesService: PoliciaisPublicacoesService,
        private policiaisService: PoliciaisService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('policiais_atestados');
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.policiaisPublicacoesService.wherePol(this.id).subscribe({
                next: (data) => {
                    this.data$ = data;
                }
            });

            this.subscription3 =  this.policiaisService.find(this.id).subscribe({
                next: (data) => {
                    this.policial = data;
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

        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
    }

      getPosition(id:any){
        
      }
}