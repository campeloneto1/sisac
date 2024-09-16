import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosOficinasService } from "../veiculos-oficinas.service";
import { VeiculoOficina } from "../veiculo-oficina";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Veiculos } from "../../veiculos/veiculo";
import { Oficinas } from "../../oficinas/oficina";
import { ManutencoesTipos } from "../../manutencoes-tipos/manutencao-tipo";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { ManutencoesTiposService } from "../../manutencoes-tipos/manutencoes-tipos.service";
import { OficinasService } from "../../oficinas/oficinas.service";
import { SessionService } from "../../../session.service";


@Component({
    selector: "app-veiculos-oficinas-form",
    templateUrl: './veiculos-oficinas-form.component.html',
    styleUrl: './veiculos-oficinas-form.component.css',
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
export class VeiculosOficinasFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;
    protected veiculos$!: Observable<Veiculos>;
    protected oficinas$!: Observable<Oficinas>;
    protected manutencoestipos$!: Observable<ManutencoesTipos>;

    private subscription: any;

    @Output('refresh') refresh: EventEmitter<VeiculoOficina> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private veiculosOficinasService: VeiculosOficinasService,
        private veiculosService:VeiculosService,
        private oficinasService:OficinasService,
        private manutencoesTiposService:ManutencoesTiposService,
        private toastr: ToastrService,
        private sessionService: SessionService,
    ){}
    
    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'veiculo': [null, Validators.compose([
                Validators.required,
            ])],
            'oficina': [null, Validators.compose([
                Validators.required,
            ])],
            'manutencao_tipo': [null, Validators.compose([
                Validators.required,
            ])],

            'data_inicial': [null],
            'data_final': [null],
            'km_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'km_final': [null],
            'observacoes': [null],
            'subunidade': [null],
        });
        // this.veiculos$ = this.veiculosService.index();
        this.oficinas$ = this.oficinasService.index();
        this.manutencoestipos$ = this.manutencoesTiposService.index();

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
       
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }


    cadastrar(){
        if(this.form.value.id){
            this.veiculosOficinasService.update(this.form.value.id, this.form.value).subscribe({
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
            if(this.sessionService.getSubunidade()){
                this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
            }else{
                this.toastr.error('Selecione uma subunidade!');
            }
            this.veiculosOficinasService.create(this.form.value).subscribe({
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

    editar(data: VeiculoOficina){
        this.form.patchValue(data);
       
        if(data.veiculo){
            this.form.get('veiculo')?.patchValue(data.veiculo.id);
        }
        if(data.oficina){
            this.form.get('oficina')?.patchValue(data.oficina.id);
        }
        if(data.manutencao_tipo){
            this.form.get('manutencao_tipo')?.patchValue(data.manutencao_tipo.id);
        }
    }
}