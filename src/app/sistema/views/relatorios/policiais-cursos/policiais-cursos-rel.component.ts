import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisCursosRelService } from "./policiais-cursos-rel.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Policiais } from "../../policiais/policial";
import { Graduacoes } from "../../graduacoes/graduacao";
import { Setores } from "../../setores/setor";
import { GraduacoesService } from "../../graduacoes/graduacoes.service";
import { SetoresService } from "../../setores/setores.service";
import { SessionService } from "../../../session.service";
import { PoliciaisAtestados } from "../../policiais-atestados/policial-atestado";
import { PoliciaisService } from "../../policiais/policiais.service";
import { AfastamentosTipos } from "../../afastamentos-tipos/afastamento-tipo";
import { AfastamentosTiposService } from "../../afastamentos-tipos/afastamentos-tipos.service";
import { PoliciaisCursos } from "../../policiais-cursos/policial-curso";
import { Cursos } from "../../cursos/curso";
import { CursosService } from "../../cursos/cursos.service";

@Component({
    selector: 'app-policiais-cursos-rel',
    templateUrl: './policiais-cursos-rel.component.html',
    styleUrl: './policiais-cursos-rel.component.css',
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
export class PoliciaisCursosRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<PoliciaisCursos>;

    protected form!: FormGroup;
    protected graduacoes$!: Observable<Graduacoes>;
    protected setores$!: Observable<Setores>;
    protected policiais$!: Observable<Policiais>;
    protected cursos$!: Observable<Cursos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private policiaisCursosRelService: PoliciaisCursosRelService,
        private graduacoesService: GraduacoesService,
        private policiaisService: PoliciaisService,
        private setoresService: SetoresService,
        private cursosService: CursosService,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.sessionService.checkPermission('policiais_cursos');
        this.form = this.formBuilder.group({
            'policial': [null],
            'graduacao': [null],
            'setor': [null],
            'curso': [null],
            'vigente': [null],
            'subunidade': [null],
           
        });

        this.graduacoes$ = this.graduacoesService.index();
        this.setores$ = this.setoresService.index();
        this.cursos$ = this.cursosService.index();

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
        if(this.sessionService.getSubunidade()){
            this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
        }
       this.data$ = this.policiaisCursosRelService.relatorio(this.form.value);
    }
}