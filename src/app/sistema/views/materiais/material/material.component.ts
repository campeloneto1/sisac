import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Material } from "../material";
import { MateriaisService } from "../materiais.service";
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";
import { MaterialPolicial } from "../../materiais-policiais/material-policial";
import { MaterialPolicialItem } from "../../materiais-policiais-itens/material-policial-item";

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrl: './material.component.css',
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
export class MaterialComponent implements OnInit, OnDestroy{

    protected material!: Material;
    protected id!:number;
    private subscription:any;

    protected user!: User;

    @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
    protected dtOptions: Config = {};

    protected matPolicial!: MaterialPolicial;

    constructor(
        private materiaisService: MateriaisService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('materiais');
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.materiaisService.find(this.id).subscribe({
                next: (data) => {
                    if(!data){this.sessionService.redirect()}
                    this.material = data;
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

    showEmprestado(data: MaterialPolicialItem){
        this.matPolicial = data.material_policial;
      }
}