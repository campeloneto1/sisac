import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Empresa } from "../empresa";
import { EmpresasService } from "../empresas.service";
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { Contrato } from "../../contratos/contrato";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrl: './empresa.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
        DataTablesModule
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class EmpresaComponent implements OnInit, OnDestroy{

    protected empresa!: Empresa;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
    protected dtOptions: Config = {};

    constructor(
        private empresasService: EmpresasService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('empresas');
        this.dtOptions = {
            pageLength: 10,
            order: [0, 'desc']
        };

        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.empresasService.find(this.id).subscribe({
                next: (data) => {
                    if(!data){this.sessionService.redirect()}
                    this.empresa = data;
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

    returnPercentUsado(data: Contrato){
        var percent = (data.valor_usado * 100)/data.valor_global;
        return percent.toFixed(2);
      }
    
      returnCorUsado(data: Contrato){
        var percent = (data.valor_usado * 100)/data.valor_global;
        var color = '';
        if(percent < 50){
          color = 'bg-success'
        }else if(percent < 70){
          color = 'bg-warning'
        }else{
          color = 'bg-danger'
        }
        return color;
      }

      getSaldoDiarias(data:Contrato){
        if(data.quantidade_diarias){
          var result = data.quantidade_diarias - ((data.valor_usado*data.quantidade_diarias)/data.valor_global);
          return result.toFixed(2)
        }else{
          return null
        }
        
      }
}