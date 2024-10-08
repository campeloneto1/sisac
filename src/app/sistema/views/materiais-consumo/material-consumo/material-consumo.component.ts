import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { MaterialConsumo } from "../material-consumo";
import { MateriaisConsumoService } from "../materiais-consumo.service";
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";

@Component({
    selector: 'app-material-consumo',
    templateUrl: './material-consumo.component.html',
    styleUrl: './material-consumo.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
        DataTableModule,
        DataTablesModule
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class MaterialConsumoComponent implements OnInit, OnDestroy{

    protected materialconsumo!: MaterialConsumo;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
    protected dtOptions: Config = {};

    constructor(
        private materiaisConsumoService: MateriaisConsumoService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute,

    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('materiais_consumo');
        this.id = this.activatedRoute.snapshot.params['id'];

        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.materiaisConsumoService.find(this.id).subscribe({
                next: (data) => {
                    if(!data){this.sessionService.redirect()}
                    this.materialconsumo = data;
                }
            });
        }
        catch(e:any){
            this.sessionService.redirect()
        }

    //    this.subscription =  this.materiaisConsumoService.find(this.id).subscribe({
    //         next: (data) => {
    //             if(!data){this.sessionService.redirect()}
    //             this.materialconsumo = data;
    //         }
    //     });
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
}