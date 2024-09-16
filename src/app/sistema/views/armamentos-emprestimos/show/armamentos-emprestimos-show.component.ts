import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { ArmamentoEmprestimo } from "../armamento-emprestimo";
import { User } from "../../users/user";
import { SessionService } from "../../../session.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Subunidade } from "../../subunidades/subunidade";
import { ArmamentosEmprestimosService } from "../armamentos-emprestimos.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-armamento-emprestimo-show',
    templateUrl: './armamentos-emprestimos-show.component.html',
    styleUrl: './armamentos-emprestimos-show.component.css',
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
export class ArmamentosEmprestimosShow implements OnInit, OnDestroy, OnChanges{

    @Input() armamentoemp!: ArmamentoEmprestimo;
    protected data$!: Observable<ArmamentoEmprestimo>;
    protected id!:number;
    protected user!: User;
    protected datahj!: Date;
    protected subunidade!: Subunidade;

    private subscription: any;
    private subscription2: any;

    constructor(
        private sessionService: SessionService,
        private amrmamentosEmprestimosService: ArmamentosEmprestimosService
    ){}
   
    
    
    ngOnInit(): void {
        this.datahj = new Date;
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('armamentos_emprestimos');

       this.refresh();
       
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['armamentoemp']) {
            this.refresh();
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
        if(this.armamentoemp.id){
            this.data$ = this.amrmamentosEmprestimosService.find(this.armamentoemp.id);
        }
    }

}