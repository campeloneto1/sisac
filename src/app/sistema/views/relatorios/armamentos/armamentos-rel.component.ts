import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {  ArmamentosRelService } from "./armamentos-rel.service";
import { Armamentos } from "../../armamentos/armamento";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { ArmamentosCalibres } from "../../armamentos-calibres/armamento-calibre";
import { ArmamentosTamanhos } from "../../armamentos-tamanhos/armamento-tamanho";
import { ArmamentosTipos } from "../../armamentos-tipos/armamento-tipo";
import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { ArmamentosTiposService } from "../../armamentos-tipos/armamentos-tipos.service";
import { ArmamentosCalibresService } from "../../armamentos-calibres/armamentos-calibres.service";
import { ArmamentosTamanhosService } from "../../armamentos-tamanhos/armamentos-tamanhos.service";
import { SessionService } from "../../../session.service";

@Component({
    selector: 'app-armamentos-rel',
    templateUrl: './armamentos-rel.component.html',
    styleUrl: './armamentos-rel.component.css',
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
export class ArmamentosRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<Armamentos>;

    protected form!: FormGroup;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected armamentoscalibres$!: Observable<ArmamentosCalibres>;
    protected armamentostamanhos$!: Observable<ArmamentosTamanhos>;
    protected armamentostipos$!: Observable<ArmamentosTipos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private armamentosRelService: ArmamentosRelService,
        private marcasService: MarcasService,
        private modelosService: ModelosService,
        private armamentosTiposService: ArmamentosTiposService,
        private armamentosCalibresService: ArmamentosCalibresService,
        private armamentosTamanhosService: ArmamentosTamanhosService,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.form = this.formBuilder.group({
            'marca': [null],
            'modelo': [null],
            'armamento_tipo': [null],
            'armamento_calibre': [null],
            'armamento_tamanho': [null],
            'data_baixa': [null],
            'subunidade': [null],
        });

        this.marcas$ = this.marcasService.marcasArmamentos();
        this.armamentostipos$ = this.armamentosTiposService.index();
        this.armamentoscalibres$ = this.armamentosCalibresService.index();
        this.armamentostamanhos$ = this.armamentosTamanhosService.index();
        
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
       this.data$ = this.armamentosRelService.relatorio(this.form.value);
    }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.value.marca);
    }
}