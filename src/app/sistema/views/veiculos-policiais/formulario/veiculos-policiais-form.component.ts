import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { VeiculoPolicial } from "../veiculo-policial";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Veiculos } from "../../veiculos/veiculo";
import { Policiais } from "../../policiais/policial";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { PoliciaisService } from "../../policiais/policiais.service";
import { PaisesService } from "../../paises/paises.service";
import { EstadosService } from "../../estados/estados.service";
import { CidadesService } from "../../cidades/cidades.service";
import { Paises } from "../../paises/pais";
import { Estados } from "../../estados/estado";
import { Cidades } from "../../cidades/cidade";
import { SessionService } from "../../../session.service";


@Component({
    selector: "app-veiculos-policiais-form",
    templateUrl: './veiculos-policiais-form.component.html',
    styleUrl: './veiculos-policiais-form.component.css',
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
export class VeiculosPoliciaisFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected veiculos$!: Observable<Veiculos>;
    protected policiais$!: Observable<Policiais>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;
   

    private subscription: any;
    private subscription2: any;

    @Output('refresh') refresh: EventEmitter<VeiculoPolicial> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private veiculosService:VeiculosService,
        private policiaisService:PoliciaisService,
        private paisesService:PaisesService,
        private estadosService:EstadosService,
        private cidadesService:CidadesService,
        private toastr: ToastrService,
        private sessionService: SessionService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'veiculo': [null, Validators.compose([
                Validators.required,
            ])],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],

            'data_inicial': [null],
            'data_final': [null],
            'km_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'km_final': [null],
            'observacoes': [null],
            'pais': [null, Validators.compose([
                Validators.required,
            ])],
            'estado': [null, Validators.compose([
                Validators.required,
            ])],
            'cidade': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null],
        });
        

        this.subscription = this.veiculosService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.placa_especial){
                        //@ts-ignore
                        element.nome = `${element.modelo.marca.nome} ${element.modelo.nome}, Placa: ${element.placa}, Placa Esp. ${element.placa_especial}, KM Atual: ${element.km_atual}`;
                    }else{
                        //@ts-ignore
                        element.nome = `${element.modelo.marca.nome} ${element.modelo.nome}, Placa: ${element.placa}, KM Atual: ${element.km_atual}`;
                    }
                    
                });
                this.veiculos$ = of(data);
            }
        });

        this.subscription2 = this.policiaisService.getAll().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.numeral){
                        element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}, ${element.setor.subunidade.abreviatura}`;
                    }else{
                        element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}, ${element.setor.subunidade.abreviatura}`;
                    }
                    
                });
                this.policiais$ = of(data);
            }
        });
        this.paises$ = this.paisesService.index();
    }

    cadastrar(){
        delete this.form.value.estado;
        delete this.form.value.pais;
        if(this.form.value.id){
            this.veiculosPoliciaisService.update(this.form.value.id, this.form.value).subscribe({
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
            this.veiculosPoliciaisService.create(this.form.value).subscribe({
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

    editar(data: VeiculoPolicial){
        this.form.patchValue(data);
        if(data.cidade){
            this.form.get('pais')?.patchValue(data.cidade.estado.pais.id);
            this.form.get('estado')?.patchValue(data.cidade.estado.id)
            this.form.get('cidade')?.patchValue(data.cidade.id)
            this.getEstados();
            this.getCidades();
        }
        if(data.veiculo){
            this.form.get('veiculo')?.patchValue(data.veiculo.id);
        }
        if(data.policial){
            this.form.get('policial')?.patchValue(data.policial.id);
        }
       
    }

    reset(){
        this.form.reset();
    }

    getEstados(){
        this.estados$ = this.estadosService.wherePais(this.form.get('pais')?.value);
    }

    getCidades(){
        this.cidades$ = this.cidadesService.whereEstado(this.form.get('estado')?.value);
    }
}