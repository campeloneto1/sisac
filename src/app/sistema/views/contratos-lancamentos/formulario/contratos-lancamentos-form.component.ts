import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContratosLancamentosService } from "../contratos-lancamentos.service";
import { ContratoLancamento } from "../contrato-lancamento";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";

@Component({
    selector: "app-contratos-lancamentos-form",
    templateUrl: './contratos-lancamentos-form.component.html',
    styleUrl: './contratos-lancamentos-form.component.css',
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
export class ContratosLancamentosFormComponent implements OnInit, OnDestroy{
    
    form!: FormGroup;

    private subscription:any;

    @Input() contrato!: number;

    @Output('refresh') refresh: EventEmitter<ContratoLancamento> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private contratosLancamentosService: ContratosLancamentosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'contrato': [null],
            'valor': [null, Validators.compose([
                Validators.required,
            ])],
            'mes_referencia': [null, Validators.compose([
                Validators.required,
            ])],
            'observacoes': [null]
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        this.form.get('mes_referencia')?.patchValue(`${this.form.value.mes_referencia}-01`)
        this.form.get('contrato')?.patchValue(this.contrato)
        if(this.form.value.id){
            this.contratosLancamentosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.contratosLancamentosService.create(this.form.value).subscribe({
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

    editar(data: ContratoLancamento){
        this.form.patchValue(data);
    }

    cancelar(){
        this.form.reset();
        this.cancel.emit();
    }
}