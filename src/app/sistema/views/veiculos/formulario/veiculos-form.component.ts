import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosService } from "../veiculos.service";
import { Veiculo } from "../veiculo";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { UnidadesService } from "../../unidades/unidades.service";
import { Unidades } from "../../unidades/unidade";
import { Subunidades } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Cores } from "../../cores/cor";
import { VeiculosTipos } from "../../veiculos-tipos/veiculo-tipo";
import { VeiculosTiposService } from "../../veiculos-tipos/veiculos-tipos.service";
import { CoresService } from "../../cores/cores.service";


@Component({
    selector: "app-veiculos-form",
    templateUrl: './veiculos-form.component.html',
    styleUrl: './veiculos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        InputTextareaComponent
    ]
})
export class VeiculosFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected cores$!: Observable<Cores>;
    protected veiculostipos$!: Observable<VeiculosTipos>;
    protected unidades$!: Observable<Unidades>;
    protected subunidades$!: Observable<Subunidades>;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected selectedtipo: any;

    @Output('refresh') refresh: EventEmitter<Veiculo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private veiculosService:VeiculosService,
        private veiculosTiposService:VeiculosTiposService,
        private coresService:CoresService,
        private unidadesService:UnidadesService,
        private subunidadesService:SubunidadesService,
        private marcasService:MarcasService,
        private modelosService:ModelosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'placa': [null, Validators.compose([
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(7)
            ])],
            'placa_especial': [null, Validators.compose([
                Validators.minLength(7),
                Validators.maxLength(7)
            ])],
            
            'chassi': [null],
            'renavam': [null],
            'ano': [null, Validators.compose([
                Validators.min(2000),
                Validators.max(2050),
                Validators.required
            ])],
            'blindado': [null],
            'organico': [null],
            'km_inicial': [null, Validators.compose([
                Validators.required,
                Validators.min(0),
            ])],
            'km_atual': [null],
            'km_troca_oleo': [null, Validators.compose([
                Validators.min(0),
            ])],

            'marca': [null, Validators.compose([
                Validators.required,
            ])],
            'modelo': [null, Validators.compose([
                Validators.required,
            ])],
            'cor': [null, Validators.compose([
                Validators.required,
            ])],
            'veiculo_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'observacoes': [null],
            'data_baixa': [null],
        });
        //this.unidades$ = this.unidadesService.index();
        this.marcas$ = this.marcasService.marcasTransporte();
        this.veiculostipos$ = this.veiculosTiposService.index();
        this.cores$ = this.coresService.index();
       
    }

    cadastrar(){
        

        if(!this.form.value.data_baixa){
            this.form.get('data_baixa')?.patchValue(null);
        }

        this.form.value.placa = this.form.value.placa.toUpperCase();
        if(this.form.value.placa_especial){
            this.form.value.placa_especial = this.form.value.placa_especial.toUpperCase();
        }
        delete this.form.value.marca;
        if(this.form.value.id){
            this.veiculosService.update(this.form.value.id, this.form.value).subscribe({
                next: (data:any) => {
                    this.toastr.success('Edição realizada com sucesso!');
                    this.form.reset();
                    this.refresh.emit();
                },
                error: (error:any) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            });
        }else{
            this.veiculosService.create(this.form.value).subscribe({
                next: (data:any) => {
                    this.toastr.success('Cadastro realizado com sucesso!');
                    this.form.reset();
                    this.refresh.emit();
                },
                error: (error:any) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            });
        }
       
    }

    editar(data: Veiculo){
        this.form.patchValue(data);
        if(data.modelo){
            this.form.get('marca')?.patchValue(data.modelo.marca.id);
            this.form.get('modelo')?.patchValue(data.modelo.id);
            this.getModelos();
        }
        if(data.veiculo_tipo){
            this.form.get('veiculo_tipo')?.patchValue(data.veiculo_tipo.id);
        }
        if(data.cor){
            this.form.get('cor')?.patchValue(data.cor.id);
        }
    }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.get('marca')?.value);
    }
}