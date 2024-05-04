import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Oficinas } from "../../oficinas/oficina";
import { Veiculos } from "../../veiculos/veiculo";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { OficinasService } from "../../oficinas/oficinas.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { ManutencoesTipos } from "../../manutencoes-tipos/manutencao-tipo";
import { ManutencoesTiposService } from "../../manutencoes-tipos/manutencoes-tipos.service";
import { VeiculosOficinasRelService } from "./veiculos-oficinas-rel.service";
import { VeiculosOficinas } from "../../veiculos-oficinas/veiculo-oficina";

@Component({
    selector: 'app-veiculos-oficinas-rel',
    templateUrl: './veiculos-oficinas-rel.component.html',
    styleUrl: './veiculos-oficinas-rel.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
    ]
})
export class VeiculosOficinasRel implements OnInit, OnDestroy{

    protected data$!: Observable<VeiculosOficinas>;

    protected form!: FormGroup;
    protected oficinas$!: Observable<Oficinas>;
    protected veiculos$!: Observable<Veiculos>;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected manutencoestipos$!: Observable<ManutencoesTipos>;

    private subscription: any;

    constructor(
        private formBuilder: FormBuilder,
        private oficinasService: OficinasService,
        private veiculosService: VeiculosService,
        private marcasService: MarcasService,
        private modelosService: ModelosService,
        private manutencoesTiposService: ManutencoesTiposService,
        private veiculosOficinasRelService: VeiculosOficinasRelService
    ){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'oficina': [null],
            'veiculo': [null],
            'data_inicial': [null, Validators.compose([
                Validators.required
            ])],
            'data_final': [null, Validators.compose([
                Validators.required
            ])],
            'manutencao_tipo': [null],
            'marca': [null],
            'modelo': [null],
        });

        this.oficinas$ = this.oficinasService.index();
        this.subscription = this.veiculosService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.placa_especial){
                        //@ts-ignore
                        element.nome = `${element.modelo.marca.nome} ${element.modelo.nome}, Placa: ${element.placa}, Placa Esp. ${element.placa_especial}`;
                    }else{
                        //@ts-ignore
                        element.nome = `${element.modelo.marca.nome} ${element.modelo.nome}, Placa: ${element.placa}`;
                    }
                    
                });
                this.veiculos$ = of(data);
            }
        });
        this.marcas$ = this.marcasService.index();
        this.manutencoestipos$ = this.manutencoesTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.value.marca)
    }

    pesquisar(){
       this.data$ = this.veiculosOficinasRelService.relatorio(this.form.value);
    }
}