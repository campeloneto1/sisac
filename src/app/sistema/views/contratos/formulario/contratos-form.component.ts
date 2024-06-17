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
import { EmpresasService } from "../../empresas/empresas.service";
import { Empresas } from "../../empresas/empresa";

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
    protected empresas$!: Observable<Empresas>;
    protected policiais$!: Observable<Policiais>;

    private subscription:any;
    private subscription2:any;

    @Output('refresh') refresh: EventEmitter<Contrato> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private contratosService: ContratosService,
        private policiaisService: PoliciaisService,
        private empresasService: EmpresasService,
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
            'data_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'data_final': [null, Validators.compose([
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
            'observacoes': [null]
        });

        this.subscription2 = this.empresasService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.nome_fantasia){
                        element.nome = `${element.nome_fantasia}, ${element.cnpj} `;
                    }else{
                        element.nome = `${element.nome}, ${element.cnpj}`;
                    }
                });
                this.empresas$ = of(data);
            }
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
        if(this.subscription2){
            this.subscription2.unsubscribe();
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
        if(data.empresa){
            this.form.get('empresa')?.patchValue(data.empresa.id);
        }
        if(data.contrato_objeto){
            this.form.get('contrato_objeto')?.patchValue(data.contrato_objeto.id);
        }
        if(data.contrato_tipo){
            this.form.get('contrato_tipo')?.patchValue(data.contrato_tipo.id);
        }
        if(data.gestor){
            this.form.get('gestor')?.patchValue(data.gestor.id);
        }
        if(data.fiscal){
            this.form.get('fiscal')?.patchValue(data.fiscal.id);
        }
    }
}