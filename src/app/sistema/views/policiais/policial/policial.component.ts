import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { Policial } from "../policial";
import { PoliciaisService } from "../policiais.service";
import { Router,ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { environment } from "../../../../../environments/environments";
import { Observable, tap } from "rxjs";
import { VeiculoPolicial, VeiculosPoliciais } from "../../veiculos-policiais/veiculo-policial";
import { ArmamentoEmprestimo, ArmamentosEmprestimos } from "../../armamentos-emprestimos/armamento-emprestimo";
import { MateriaisPoliciais, MaterialPolicial } from "../../materiais-policiais/material-policial";
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
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";
import { ArmamentosEmprestimosShow } from "../../armamentos-emprestimos/show/armamentos-emprestimos-show.component";
import { MateriaisPoliciaisShow } from "../../materiais-policiais/show/materiais-policiais-show.component";
import { VeiculosPoliciaisShow } from "../../veiculos-policiais/show/veiculos-policiais-show.component";

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
        RouterModule,
        DataTablesModule,
        ArmamentosEmprestimosShow,
        MateriaisPoliciaisShow,
        VeiculosPoliciaisShow
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class PolicialComponent implements OnInit, OnDestroy{

    protected policial$!: Observable<Policial>;
    protected id!:number;
    private subscription:any;

    protected urlfoto:string = environment.image;

    protected user!: User;

    protected foto: any;

    @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
    protected dtOptions: Config = {};

    protected armamentosemprestimos$!: Observable<ArmamentosEmprestimos>;
    protected materiaispoliciais$!: Observable<MateriaisPoliciais>;
    protected veiculospoliciais$!: Observable<VeiculosPoliciais>;
    protected policiaisatestados$!: Observable<PoliciaisAtestados>;
    protected policiaiscursos$!: Observable<PoliciaisCursos>;
    protected policiaisferias$!: Observable<PoliciaisFerias>;
    protected policiaispublicacoes$!: Observable<PoliciaisPublicacoes>;

    protected armamentoEmprestado!: ArmamentoEmprestimo;
    protected materialPolicial!: MaterialPolicial;
    protected veiculoPolicial!: VeiculoPolicial;

    @ViewChild(MateriaisPoliciaisShow) componentmatpolshow!: MateriaisPoliciaisShow;

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
        this.dtOptions = {
            pageLength: 10,
            order: [0, 'desc']
        };

        try {
            this.id = Number(window.atob(this.activatedRoute.snapshot.params['id']));

            this.policial$ =  this.policiaisService.find(this.id).pipe(tap((data) => {
                    this.getfile(data.foto||'');
                }
            ));
            
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

    getEmpArmamentos(data: number){
        if(!this.armamentosemprestimos$){
            this.armamentosemprestimos$ = this.armamentosEmprestimosService.wherePol(data||0);
        }
    }

    getEmpMateriais(data: number){
        if(!this.materiaispoliciais$){
            this.materiaispoliciais$ = this.materiaisPoliciaisService.wherePol(data||0);
        }
    }

    getEmpVeiculos(data: number){
        if(!this.veiculospoliciais$){
            this.veiculospoliciais$ = this.veiculosPoliciaisService.wherePol(data||0);
        }
    }

    getPolAtestados(data: number){
        if(!this.policiaisatestados$){
            this.policiaisatestados$ = this.policiaisAtestadosService.wherePol(data||0);
        }
    }

    getPolCursos(data: number){
        if(!this.policiaiscursos$){
            this.policiaiscursos$ = this.policiaisCursosService.wherePol(data||0);
        }
    }

    getPolFerias(data: number){
        if(!this.policiaisferias$){
            this.policiaisferias$ = this.policiaisFeriasService.wherePol(data||0);
        }
    }

    getPolPublicacoes(data: number){
        if(!this.policiaispublicacoes$){
            this.policiaispublicacoes$ = this.policiaisPublicacoesService.wherePol(data||0);
        }
    }

    encodeId(id: any){
        var encoded = this.sharedService.encodeId(id);
        return encoded;
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
        });
    }

    showArmEmprestado(data: ArmamentoEmprestimo){
        this.armamentoEmprestado = {...data};
    }

    showMatEmprestado(data: MaterialPolicial){
        this.materialPolicial = data;
    }

    showVeiculosEmprestado(data: VeiculoPolicial){
        this.veiculoPolicial = data;
    }
}