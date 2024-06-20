import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { PoliciaisService } from "../../policiais/policiais.service";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { Policiais } from "../../policiais/policial";
import { Veiculos } from "../../veiculos/veiculo";
import { Observable, of } from "rxjs";
import { PaisesService } from "../../paises/paises.service";
import { Paises } from "../../paises/pais";
import { Estados } from "../../estados/estado";
import { Cidades } from "../../cidades/cidade";
import { EstadosService } from "../../estados/estados.service";
import { CidadesService } from "../../cidades/cidades.service";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { VeiculoPolicial } from "../veiculo-policial";

@Component({
    selector: '',
    templateUrl: './veiculos-policiais-form-policial.component.html',
    styleUrl: './veiculos-policiais-form-policial.component.css',
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
export class VeiculosPoliciaisFormPolicial implements OnInit, OnDestroy{

    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;
    protected veiculos$!: Observable<Veiculos>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;
    protected exibir!: number;
    protected veiculoemprestado!: VeiculoPolicial;

    private user!: User;

    private subscription!: any;
    private subscription2!: any;
    private subscription3!: any;
    private subscription4!: any;
    private subscription5!: any;
    
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private policiaisService: PoliciaisService,
        private sessionService: SessionService,
        private veiculosService: VeiculosService,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private paisesService: PaisesService,
        private estadosService: EstadosService,
        private cidadesService: CidadesService
    ){}

    ngOnInit(): void {
        this.subscription3 = this.veiculosPoliciaisService.veiculoPolicial().subscribe({
            next: (data) => {
                console.log(data)
                if(data){
                    this.exibir = 2;
                    this.veiculoemprestado = data;
                }else{
                    this.exibir = 1;
                }
               
            }
        });

        this.form = this.formBuilder.group({
            'id': [null],
            'veiculo': [null, Validators.compose([
                Validators.required,
            ])],
            'policial': [null],
            'etapa': [2],
            'data_inicial': [null],
            'data_final': [null],
            'km_inicial': [null],
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
        });
        
        this.user = this.sessionService.getUser();
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

        // this.subscription2 = this.policiaisService.disponiveis().subscribe({
        //     next: (data) => {
        //         data.forEach(element => {
        //             if(element.numeral){
        //                 element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
        //             }else{
        //                 element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}`;
        //             }
                    
        //         });
        //         this.policiais$ = of(data);
        //     }
        // });
        this.paises$ = this.paisesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
        if(this.subscription4){
            this.subscription4.unsubscribe();
        }
    }

    reset(){
        this.form.reset();
    }

    proximo(){
        this.form.get('etapa')?.patchValue(this.form.value.etapa + 1);
    }

    anterior(){
        this.form.get('etapa')?.patchValue(this.form.value.etapa - 1);
    }

    cadastrar(){
        if(this.user.policial){
            this.form.get('policial')?.patchValue(this.user.policial.id);

        this.subscription4 = this.veiculosPoliciaisService.create(this.form.value).subscribe({
                next: (data) => {
                    this.veiculosPoliciaisService.veiculoPolicial().subscribe({
                        next: (data) => {
                            this.exibir = 2;
                            this.veiculoemprestado = data;
                        }
                    });
                },
                error: (error) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            })
        }
    }

    getEstados(){
        this.estados$ = this.estadosService.wherePais(this.form.get('pais')?.value);
    }

    getCidades(){
        this.cidades$ = this.cidadesService.whereEstado(this.form.get('estado')?.value);
    }
}