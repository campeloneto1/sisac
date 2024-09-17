import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { PoliciaisService } from "../policiais.service";
import { Policial } from "../policial";
import { SharedService } from "../../../shared/shared.service";

@Component({
    selector: 'app-policiais-ficha-financeira',
    templateUrl: './policiais-ficha-financeira.component.html',
    styleUrl: './policiais-ficha-financeira.component.css',
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
export class PoliciaisFichaFinanceiraComponent implements OnInit, OnDestroy{

    protected data$!: Policial;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    protected foto: any;

    constructor(
        private policiaisService: PoliciaisService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService,
        private sharedService: SharedService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('policiais_atestados');
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.policiaisService.find(this.id).subscribe({
                next: (data) => {
                    this.data$ = data;
                    if(data.foto){
                        this.getfile(data.foto||'');
                    }
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

    dataFinal(data: Date, dias:number): Date{
        let result = new Date(data);
        result.setDate(result.getDate() + dias);
        return result;
      }

      getfile(data: string){
        var obj = {
            file: data
        }
        this.sharedService.getFile(obj).subscribe({
            next: (data) => {
            const url = window.URL.createObjectURL(data);
            this.foto = url;
            }
        })
    }

}