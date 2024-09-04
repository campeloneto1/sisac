import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Policial } from "../policial";
import { PoliciaisService } from "../policiais.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { environment } from "../../../../../environments/environments";
import { Observable } from "rxjs";
import { VeiculosPoliciais } from "../../veiculos-policiais/veiculo-policial";
import { ArmamentosEmprestimos } from "../../armamentos-emprestimos/armamento-emprestimo";
import { MateriaisPoliciais } from "../../materiais-policiais/material-policial";
import { PoliciaisAtestados } from "../../policiais-atestados/policial-atestado";
import { PoliciaisCursos } from "../../policiais-cursos/policial-curso";
import { PoliciaisFerias } from "../../policiais-ferias/policial-ferias";
import { PoliciaisPublicacoes } from "../../policiais-publicacoes/policial-publicacao";
import { ArmamentosEmprestimosService } from "../../armamentos-emprestimos/armamentos-emprestimos.service";
import { MateriaisPoliciaisService } from "../../materiais-policiais/materiais-policiais.service";
import { VeiculosPoliciaisService } from "../../veiculos-policiais/veiculos-policiais.service";
import { PoliciaisAtestadosService } from "../../policiais-atestados/policiais-atestados.service";
import { PoliciaisCursosService } from "../../policiais-cursos/policiais-cursos.service";
import { PoliciaisFeriasService } from "../../policiais-ferias/policiais-ferias.service";
import { PoliciaisPublicacoesService } from "../../policiais-publicacoes/policiais-publicacoes.service";
import { SharedService } from "../../../shared/shared.service";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-policial',
    templateUrl: './policial.component.html',
    styleUrl: './policial.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
        DataTableModule,
        RouterModule
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class PolicialComponent implements OnInit, OnDestroy{

    protected policial!: Policial;
    protected id!:number;
    private subscription:any;

    protected urlfoto:string = environment.image;

    protected user!: User;

    protected foto: any;

    protected armamentosemprestimos$!: Observable<ArmamentosEmprestimos>;
    protected materiaispoliciais$!: Observable<MateriaisPoliciais>;
    protected veiculospoliciais$!: Observable<VeiculosPoliciais>;
    protected policiaisatestados$!: Observable<PoliciaisAtestados>;
    protected policiaiscursos$!: Observable<PoliciaisCursos>;
    protected policiaisferias$!: Observable<PoliciaisFerias>;
    protected policiaispublicacoes$!: Observable<PoliciaisPublicacoes>;

    constructor(
        private policiaisService: PoliciaisService,
        private sessionService: SessionService,
        private sharedService: SharedService,
        private activatedRoute: ActivatedRoute,
        private armamentosEmprestimosService: ArmamentosEmprestimosService,
        private materiaisPoliciaisService: MateriaisPoliciaisService,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private policiaisAtestadosService: PoliciaisAtestadosService,
        private policiaisCursosService: PoliciaisCursosService,
        private policiaisFeriasService: PoliciaisFeriasService,
        private policiaisPublicacoesService: PoliciaisPublicacoesService
        
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('policiais');
        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.subscription =  this.policiaisService.find(this.id).subscribe({
                next: (data) => {
                    if(!data){this.sessionService.redirect()}
                    this.policial = data;
                    this.getfile();
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

    getEmpArmamentos(){
        if(!this.armamentosemprestimos$){
            this.armamentosemprestimos$ = this.armamentosEmprestimosService.wherePol(this.policial.id||0);
        }
    }

    getEmpMateriais(){
        if(!this.materiaispoliciais$){
            this.materiaispoliciais$ = this.materiaisPoliciaisService.wherePol(this.policial.id||0);
        }
    }

    getEmpVeiculos(){
        if(!this.veiculospoliciais$){
            this.veiculospoliciais$ = this.veiculosPoliciaisService.wherePol(this.policial.id||0);
        }
    }

    getPolAtestados(){
        if(!this.policiaisatestados$){
            this.policiaisatestados$ = this.policiaisAtestadosService.wherePol(this.policial.id||0);
        }
    }

    getPolCursos(){
        if(!this.policiaiscursos$){
            this.policiaiscursos$ = this.policiaisCursosService.wherePol(this.policial.id||0);
        }
    }

    getPolFerias(){
        if(!this.policiaisferias$){
            this.policiaisferias$ = this.policiaisFeriasService.wherePol(this.policial.id||0);
        }
    }

    getPolPublicacoes(){
        if(!this.policiaispublicacoes$){
            this.policiaispublicacoes$ = this.policiaisPublicacoesService.wherePol(this.policial.id||0);
        }
    }

    encodeId(id: any){
        var encoded = this.sharedService.encodeId(id);
        return encoded;
    }

    getfile(){
        var obj = {
            file: this.policial.foto
        }
        this.sharedService.getFile(obj).subscribe({
            next: (data) => {
            const url = window.URL.createObjectURL(data);
            this.foto = url;
            }
        })
    }
}