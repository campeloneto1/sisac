import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Veiculos } from "../../veiculos/veiculo";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosPoliciaisRelService } from "./veiculos-policiais-rel.service";
import { VeiculosPoliciais } from "../../veiculos-policiais/veiculo-policial";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SessionService } from "../../../session.service";

@Component({
    selector: 'app-veiculos-policiais-rel',
    templateUrl: './veiculos-policiais-rel.component.html',
    styleUrl: './veiculos-policiais-rel.component.css',
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
export class VeiculosPoliciaisRel implements OnInit, OnDestroy{

    protected data$!: Observable<VeiculosPoliciais>;

    protected form!: FormGroup;
    protected policiais$!: Observable<Policiais>;
    protected veiculos$!: Observable<Veiculos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private policiaisService: PoliciaisService,
        private veiculosService: VeiculosService,
        private veiculosPoliciaisRelService:VeiculosPoliciaisRelService,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.form = this.formBuilder.group({
            'policial': [null],
            'veiculo': [null],
            'data_inicial': [null, Validators.compose([
                Validators.required
            ])],
            'data_final': [null, Validators.compose([
                Validators.required
            ])],
            'subunidade': [null],
        });

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
        this.subscription2 = this.policiaisService.disponiveis().subscribe({
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
       this.data$ = this.veiculosPoliciaisRelService.relatorio(this.form.value);
    }
}