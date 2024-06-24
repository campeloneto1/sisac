import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContratosService } from "../contratos.service";
import { Contrato } from "../contrato";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { SessionService } from "../../../session.service";

@Component({
    selector: "app-contratos-form-aditivar",
    templateUrl: './contratos-form-aditivar.component.html',
    styleUrl: './contratos-form-aditivar.component.css',
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
export class ContratosFormAditivarComponent implements OnInit, OnDestroy{
    
    form!: FormGroup;

    @Input() contrato!: Contrato;

    @Output('refresh') refresh: EventEmitter<Contrato> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private contratosService: ContratosService,
        private toastr: ToastrService,
        private sessionService: SessionService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'porcentagem_aditivado': [1, Validators.compose([
                Validators.required,
            ])],
            'observacoes_aditivado': [null],
        });
    }

    ngOnDestroy(): void {
       
    }

    cadastrar(){
        this.form.get('id')?.patchValue(this.contrato.id);
        this.contratosService.aditivar(this.form.value.id, this.form.value).subscribe({
            next: (data:any) => {
                this.toastr.success('Aditivo realizado com sucesso!');
                this.form.reset();
                this.refresh.emit();
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        });
    }

    editar(data: Contrato){
        this.form.patchValue(data);
    }
}