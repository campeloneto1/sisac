import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContratosService } from "../contratos.service";
import { Contrato } from "../contrato";
import { ToastrService } from "ngx-toastr";
import { ContratosTipos } from "../../contratos-tipos/contrato-tipo";
import { ContratosObjetos } from "../../contratos-objetos/contrato-objeto";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { ContratosTiposService } from "../../contratos-tipos/contratos-tipos.service";
import { ContratosObjetosService } from "../../contratos-objetos/contratos-objetos.service";
import { Observable, of } from "rxjs";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";

@Component({
    selector: "app-contratos-form",
    templateUrl: './contratos-form.component.html',
    styleUrl: './contratos-form.component.css',
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
export class ContratosFormComponent implements OnInit, OnDestroy{
    
    form!: FormGroup;

    protected contratostipos$!: Observable<ContratosTipos>;
    protected contratosobjetos$!: Observable<ContratosObjetos>;
    protected policiais$!: Observable<Policiais>;

    private subscription:any;

    @Output('refresh') refresh: EventEmitter<Contrato> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private contratosService: ContratosService,
        private policiaisService: PoliciaisService,
        private contratosTiposService: ContratosTiposService,
        private contratosObjetosService: ContratosObjetosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'subunidade': [null],
            'empresa': [null, Validators.compose([
                Validators.required,
            ])],
            'numero_contrato': [null, Validators.compose([
                Validators.required,
                Validators.maxLength(50)
            ])],
            'numero_sacc': [null, Validators.compose([
                Validators.required,
                Validators.maxLength(50)
            ])],
            'valor_global': [null, Validators.compose([
                Validators.required,
            ])],
            'prazo_vigencia': [null, Validators.compose([
                Validators.required,
            ])],
            'prorrogavel': [null],
            'contrato_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'contrato_objeto': [null, Validators.compose([
                Validators.required,
            ])],
            'gestor': [null, Validators.compose([
                Validators.required,
            ])],
            'fiscal': [null, Validators.compose([
                Validators.required,
            ])],
        });

        this.contratosobjetos$ = this.contratosObjetosService.index();
        this.contratostipos$ = this.contratosTiposService.index();
        this.subscription = this.policiaisService.disponiveis().subscribe({
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
    }

    cadastrar(){
        if(this.form.value.id){
            this.contratosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.contratosService.create(this.form.value).subscribe({
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

    editar(data: Contrato){
        this.form.patchValue(data);
    }
}