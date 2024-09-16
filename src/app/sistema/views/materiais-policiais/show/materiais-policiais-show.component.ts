import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { MaterialPolicial } from "../material-policial";
import { MateriaisPoliciaisService } from "../materiais-policiais.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-materiais-policiais-show',
    templateUrl: './materiais-policiais-show.component.html',
    styleUrl: './materiais-policiais-show.component.css',
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
export class MateriaisPoliciaisShow implements OnInit, OnDestroy, OnChanges{

    @Input() materialpolicial!: MaterialPolicial;
    protected data$!: Observable<MaterialPolicial>;
    protected id!:number;
    protected user!: User;

    constructor(
        private materiaisPoliciaisService: MateriaisPoliciaisService,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}
   
    
    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('materiais_policiais');

        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['materialpolicial']) {
            this.refresh();
          }
    }
    
    ngOnDestroy(): void {
       
    }

    refresh(){
        if(this.materialpolicial.id){
            this.data$ = this.materiaisPoliciaisService.find(this.materialpolicial.id);
        }
    }

}