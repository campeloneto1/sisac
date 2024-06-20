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
    selector: "app-armamentos-form-quantidade",
    templateUrl: './armamentos-form-quantidade.component.html',
    styleUrl: './armamentos-form-quantidade.component.css',
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
export class ArmamentosFormQuantidadeComponent implements OnInit{
    
    protected form!: FormGroup;

    protected editando:boolean = false;

    @Input() armamento!: number;

    @Output('refresh') refresh: EventEmitter<Armamento> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosService: ArmamentosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'quantidade': [null, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],
            'tipo': [null, Validators.compose([
                Validators.required,
            ])],
        });
    }

    cadastrar(){
          this.form.get('id')?.patchValue(this.armamento);
        this.armamentosService.ajustarQuantidade(this.form.value.id, this.form.value).subscribe({
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