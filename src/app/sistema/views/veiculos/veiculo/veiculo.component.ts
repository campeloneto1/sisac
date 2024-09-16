import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Veiculo } from "../veiculo";
import { VeiculosService } from "../veiculos.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";
import { VeiculoPolicial } from "../../veiculos-policiais/veiculo-policial";
import { VeiculoOficina } from "../../veiculos-oficinas/veiculo-oficina";
import { VeiculosPoliciaisShow } from "../../veiculos-policiais/show/veiculos-policiais-show.component";
import { VeiculosOficinasShow } from "../../veiculos-oficinas/show/veiculos-oficinas-show.component";

@Component({
    selector: 'app-veiculo',
    templateUrl: './veiculo.component.html',
    styleUrl: './veiculo.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
        DataTableModule,
        DataTablesModule,
        VeiculosPoliciaisShow,
        VeiculosOficinasShow
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class VeiculoComponent implements OnInit, OnDestroy{

    protected veiculo!: Veiculo;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
    protected dtOptions: Config = {};
    protected dtOptions2: Config = {};

    protected veiPolicial!: VeiculoPolicial;
    protected veiOficina!: VeiculoOficina;

    constructor(
        private veiculosService: VeiculosService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('veiculos');
        this.dtOptions = {
            pageLength: 10,
            order: [0, 'desc']
        };
        this.dtOptions2 = {
            pageLength: 10,
            order: [0, 'desc']
        };
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.veiculosService.find(this.id).subscribe({
                 next: (data) => {
                     if(!data){this.sessionService.redirect()}
                     this.veiculo = data;
                 }
             });
        }
        catch(e:any){
            this.sessionService.redirect()
        }
       
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    dataFinal(data: Date, dias:number): Date{
        let result = new Date(data);
        result.setDate(result.getDate() + dias);
        return result;
      }

      showVeiculoOficina(data: VeiculoOficina){
        this.veiOficina = data;
      }

      showVeiculoPolicial(data: VeiculoPolicial){
        this.veiPolicial = data;
      }
}