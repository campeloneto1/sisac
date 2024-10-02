import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisRequeridasRelService } from "./policiais-requeridas-rel.service";
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
import { PoliciaisRequeridas } from "../../policiais-requeridas/policial-requerida";

@Component({
    selector: 'app-policiais-requeridas-rel',
    templateUrl: './policiais-requeridas-rel.component.html',
    styleUrl: './policiais-requeridas-rel.component.css',
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
export class PoliciaisRequeridasRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<PoliciaisRequeridas>;

    protected form!: FormGroup;
    protected graduacoes$!: Observable<Graduacoes>;
    protected setores$!: Observable<Setores>;
    protected policiais$!: Observable<Policiais>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private policiaisRequeridasRelService: PoliciaisRequeridasRelService,
        private graduacoesService: GraduacoesService,
        private policiaisService: PoliciaisService,
        private setoresService: SetoresService,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.sessionService.checkPermission('policiais_requeridas');
        this.form = this.formBuilder.group({
            'policial': [null],
            'graduacao': [null],
            'setor': [null],
            'vigente': [null],
            'publicado': [null],
            'subunidade': [null],
           
        });

        this.graduacoes$ = this.graduacoesService.index();
        this.setores$ = this.setoresService.index();

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
       this.data$ = this.policiaisRequeridasRelService.relatorio(this.form.value);
    }
}