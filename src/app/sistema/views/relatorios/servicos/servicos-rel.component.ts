import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SessionService } from "../../../session.service";
import { Servicos } from "../../servicos/servico";
import { Empresas } from "../../empresas/empresa";
import { Setores } from "../../setores/setor";
import { ServicosTipos } from "../../servicos-tipos/servico-tipo";
import { EmpresasService } from "../../empresas/empresas.service";
import { SetoresService } from "../../setores/setores.service";
import { ServicosTiposService } from "../../servicos-tipos/servicos-tipos.service";
import { ServicosRelService } from "./servicos-rel.service";

@Component({
    selector: 'app-servicos-rel',
    templateUrl: './servicos-rel.component.html',
    styleUrl: './servicos-rel.component.css',
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
export class ServicosRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<Servicos>;

    protected form!: FormGroup;
    protected empresas$!: Observable<Empresas>;
    protected setores$!: Observable<Setores>;
    protected servicoestipos$!: Observable<ServicosTipos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private servicosRelService: ServicosRelService,
        private empresasService: EmpresasService,
        private setoresService: SetoresService,
        private servicosTiposService: ServicosTiposService,
       
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.form = this.formBuilder.group({
            'setor': [null],
            'servico_tipo': [null],
            'empresa': [null],
            'data_inicial': [null],
            'data_final': [null],
            'subunidade': [null],
            'vigente': [null]
        });

        this.empresas$ = this.empresasService.index();
        //this.setores$ = this.setoresService.index();
        this.servicoestipos$ = this.servicosTiposService.index();
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
       this.data$ = this.servicosRelService.relatorio(this.form.value);
    }
}