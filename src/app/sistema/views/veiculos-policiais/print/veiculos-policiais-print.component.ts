import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { VeiculoPolicial } from "../veiculo-policial";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { SharedService } from "../../../shared/shared.service";

@Component({
    selector: 'app-veiculos-policiais-print',
    templateUrl: './veiculos-policiais-print.component.html',
    styleUrl: './veiculos-policiais-print.component.css',
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
export class VeiculosPoliciaisPrint implements OnInit, OnDestroy{

    protected data$!: VeiculoPolicial;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    protected fotos: Array<any> = [];

    private subscription: any;
    private subscription2: any;

    constructor(
        private veiculoPolicialService: VeiculosPoliciaisService,
        private activatedRoute: ActivatedRoute,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService,
        private sharedService: SharedService
    ){}
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('veiculos_policiais');
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.veiculoPolicialService.find(this.id).subscribe({
                next: (data) => {
                    this.data$ = data;
                    this.loadFotos();
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

    loadFotos(){
        this.fotos = [];
        
        this.data$.veiculos_policiais_alteracoes?.map(data => {
            var obj = {
                file: data.foto
            }
            this.sharedService.getFile(obj).subscribe({
                next: (data2) => {
                    const url = window.URL.createObjectURL(data2);
                    this.fotos.push(
                        {
                            //@ts-ignore
                            foto: url,
                            observacoes: data.observacoes,
                            created_at: data.created_at,
                            id: data.id
                        }
                    );
                }
            });
        });
      }
}