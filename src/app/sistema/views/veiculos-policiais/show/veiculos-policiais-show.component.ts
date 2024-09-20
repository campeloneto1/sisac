import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { VeiculoPolicial } from "../veiculo-policial";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { Observable, tap } from "rxjs";
import { SharedService } from "../../../shared/shared.service";

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

    protected fotos: Array<any> = [];

    private subscription: any;
    private subscription2: any;

    constructor(
        private veiculoPolicialService: VeiculosPoliciaisService,
        private sessionService: SessionService,
        private sharedService: SharedService
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
            this.loadFotos();
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

    loadFotos(){
        this.fotos = [];
        this.data$.subscribe({
            next: (data) => {
                data.veiculos_policiais_alteracoes?.map(data => {
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
        })
      }

}