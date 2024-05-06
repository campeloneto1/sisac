import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisRelService } from "./policiais-rel.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Policiais } from "../../policiais/policial";
import { Graduacoes } from "../../graduacoes/graduacao";
import { Setores } from "../../setores/setor";
import { Sexos } from "../../sexos/sexo";
import { GraduacoesService } from "../../graduacoes/graduacoes.service";
import { SexosService } from "../../sexos/sexos.service";
import { SetoresService } from "../../setores/setores.service";

@Component({
    selector: 'app-policiais-rel',
    templateUrl: './policiais-rel.component.html',
    styleUrl: './policiais-rel.component.css',
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
export class PoliciaisRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<Policiais>;

    protected form!: FormGroup;
    protected graduacoes$!: Observable<Graduacoes>;
    protected setores$!: Observable<Setores>;
    protected sexos$!: Observable<Sexos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private policiaisRelService: PoliciaisRelService,
        private graduacoesService: GraduacoesService,
        private sexosService: SexosService,
        private setoresService: SetoresService,
    ){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'graduacao': [null],
            'setor': [null],
            'sexo': [null],
            'transferido': [null],
           
        });

        this.graduacoes$ = this.graduacoesService.index();
        this.setores$ = this.setoresService.index();
        this.sexos$ = this.sexosService.index();
        
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
       this.data$ = this.policiaisRelService.relatorio(this.form.value);
    }
}