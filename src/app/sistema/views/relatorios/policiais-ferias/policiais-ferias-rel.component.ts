import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisFeriasRelService } from "./policiais-ferias-rel.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Policiais } from "../../policiais/policial";
import { Graduacoes } from "../../graduacoes/graduacao";
import { Setores } from "../../setores/setor";
import { GraduacoesService } from "../../graduacoes/graduacoes.service";
import { SetoresService } from "../../setores/setores.service";
import { SessionService } from "../../../session.service";
import { PoliciaisFerias } from "../../policiais-ferias/policial-ferias";
import { PoliciaisService } from "../../policiais/policiais.service";

@Component({
    selector: 'app-policiais-ferias-rel',
    templateUrl: './policiais-ferias-rel.component.html',
    styleUrl: './policiais-ferias-rel.component.css',
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
export class PoliciaisFeriasRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<PoliciaisFerias>;

    protected form!: FormGroup;
    protected graduacoes$!: Observable<Graduacoes>;
    protected setores$!: Observable<Setores>;
    protected policiais$!: Observable<Policiais>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private policiaisFeriasRelService: PoliciaisFeriasRelService,
        private graduacoesService: GraduacoesService,
        private policiaisService: PoliciaisService,
        private setoresService: SetoresService,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.sessionService.checkPermission('policiais_ferias');
        this.form = this.formBuilder.group({
            'policial': [null],
            'graduacao': [null],
            'setor': [null],
            'ano': [null],
            'vigente': [null],
            'transferido': [null],
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
       this.data$ = this.policiaisFeriasRelService.relatorio(this.form.value);
    }
}