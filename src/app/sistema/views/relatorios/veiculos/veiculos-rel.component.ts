import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosRelService } from "./veiculos-rel.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { Veiculos } from "../../veiculos/veiculo";
import { VeiculosTipos } from "../../veiculos-tipos/veiculo-tipo";
import { VeiculosTiposService } from "../../veiculos-tipos/veiculos-tipos.service";

@Component({
    selector: 'app-veiculos-rel',
    templateUrl: './veiculos-rel.component.html',
    styleUrl: './veiculos-rel.component.css',
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
export class VeiculosRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<Veiculos>;

    protected form!: FormGroup;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected veiculostipos$!: Observable<VeiculosTipos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private veiculosRelService: VeiculosRelService,
        private marcasService: MarcasService,
        private modelosService: ModelosService,
        private veiculosTiposService: VeiculosTiposService,
    ){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'marca': [null],
            'modelo': [null],
            'veiculo_tipo': [null],
            'organico': [null],
            'locado': [null],
            'data_baixa': [null],
        });

        this.marcas$ = this.marcasService.marcasTransporte();
        this.veiculostipos$ = this.veiculosTiposService.index();
        
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
       this.data$ = this.veiculosRelService.relatorio(this.form.value);
    }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.value.marca);
    }
}