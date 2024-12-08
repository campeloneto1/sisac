import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of, tap } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Policiais } from "../../policiais/policial";
import { Graduacoes } from "../../graduacoes/graduacao";
import { Setores } from "../../setores/setor";
import { GraduacoesService } from "../../graduacoes/graduacoes.service";
import { SetoresService } from "../../setores/setores.service";
import { SessionService } from "../../../session.service";
import { PoliciaisService } from "../../policiais/policiais.service";
import { PoliciaisDiarias } from "../../policiais-diarias/policial-diaria";
import { DiariasTipos } from "../../diarias-tipos/diaria-tipo";
import { DiariasStatus } from "../../diarias-status/diaria-status";
import { PoliciaisDiariasRelService } from "./policiais-diarias-rel.service";
import { DiariasStatusService } from "../../diarias-status/diarias-status.service";
import { DiariasTiposService } from "../../diarias-tipos/diarias-tipos.service";
import { Subunidade } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { User } from "../../users/user";

@Component({
    selector: 'app-policiais-diarias-rel',
    templateUrl: './policiais-diarias-rel.component.html',
    styleUrl: './policiais-diarias-rel.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
      ]
})
export class PoliciaisDiariasRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<PoliciaisDiarias>;

    protected form!: FormGroup;
    protected graduacoes$!: Observable<Graduacoes>;
    protected setores$!: Observable<Setores>;
    protected policiais$!: Observable<Policiais>;
    protected diariastipos$!: Observable<DiariasTipos>;
    protected diariasstatus$!: Observable<DiariasStatus>;
    protected subunidade!: Subunidade;
    protected user!: User;
    protected valortotal:number = 0;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private policiaisDiariasRelService: PoliciaisDiariasRelService,
        private graduacoesService: GraduacoesService,
        private policiaisService: PoliciaisService,
        private setoresService: SetoresService,
        private diariasStatusService: DiariasStatusService,
        private diariasTiposService: DiariasTiposService,
        private sessionService: SessionService,
        private subunidadesService: SubunidadesService
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.sessionService.checkPermission('relatorios');
        this.sessionService.checkPermission('policiais_diarias');
        this.form = this.formBuilder.group({
            'policial': [null],
            'graduacao': [null],
            'setor': [null],
            'diaria_tipo': [null],
            'diaria_status': [null],
            'subunidade': [null],
           
        });

        this.graduacoes$ = this.graduacoesService.index();
        this.setores$ = this.setoresService.index();
        this.diariasstatus$ = this.diariasStatusService.index();
        this.diariastipos$ = this.diariasTiposService.index();

        this.subscription2 =  this.subunidadesService.find(this.user.subunidade.id || 0).subscribe({
            next: (data) => {
                this.subunidade = data;
            }
        })

        this.subscription = this.policiaisService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.numeral){
                        element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
                    }else{
                        element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}`;
                    }
                    
                });
                this.policiais$ = of(data);
            }
        });
        
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

   

    pesquisar(){
        this.valortotal = 0;
        if(this.sessionService.getSubunidade()){
            this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
        }
       this.data$ = this.policiaisDiariasRelService.relatorio(this.form.value);
       this.getValorTotal();
    }

    getValorTotal(){
        this.data$.pipe(tap(
            (data) => {
                data.map((item) => {
                    const valor = item.valor_total ?? "0";
                    //@ts-ignore
                    this.valortotal += parseFloat(valor) || 0;
                })
            }
        )).subscribe();

        this.valortotal = parseFloat(this.valortotal.toFixed(2));
    }
}