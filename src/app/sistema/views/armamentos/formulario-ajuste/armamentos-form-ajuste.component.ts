import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentosService } from "../armamentos.service";
import { Armamento } from "../armamento";
import { ToastrService } from "ngx-toastr";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";


@Component({
    selector: "app-armamentos-form-ajuste",
    templateUrl: './armamentos-form-ajuste.component.html',
    styleUrl: './armamentos-form-ajuste.component.css',
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
export class ArmamentosFormAjusteComponent implements OnInit{
    
    protected form!: FormGroup;

    protected editando:boolean = false;

    @Input() armamento!: Armamento;

    @Output('refresh') refresh: EventEmitter<Armamento> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosService: ArmamentosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        console.log(this.armamento)
        this.form = this.formBuilder.group({
            'id': [null],
            'quantidade': [null, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],
            'quantidade_disponivel': [null, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],
        });
        this.form.reset();
        this.form.get('quantidade')?.patchValue(this.armamento.quantidade);
        this.form.get('quantidade_disponivel')?.patchValue(this.armamento.quantidade_disponivel);
    }

    cadastrar(){
          this.form.get('id')?.patchValue(this.armamento.id);
         
        this.armamentosService.ajustarQuantidade2(this.form.value.id, this.form.value).subscribe({
            next: (data:any) => {
                this.toastr.success('Edição realizada com sucesso!');
                this.form.reset();
                this.refresh.emit();
                this.editando = false;
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        });
        
    }

    cancelar(){
        this.form.reset();
        this.cancel.emit();
    }

    resetForm(){
        this.form.reset();
        this.editando = false;
    }
}