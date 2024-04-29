import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { VeiculoPolicial } from "../veiculo-policial";
import { ToastrService } from "ngx-toastr";

import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";

@Component({
    selector: "app-veiculos-policiais-form-receber",
    templateUrl: './veiculos-policiais-form-receber.component.html',
    styleUrl: './veiculos-policiais-form-receber.component.css',
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
export class VeiculosPoliciaisFormReceberComponent implements OnInit{
    
    protected form!: FormGroup;

    @Input() veiculopolicial!: VeiculoPolicial;

    @Output('refresh') refresh: EventEmitter<VeiculoPolicial> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'km_final': [null, Validators.compose([
                Validators.required,
            ])],
            'observacoes': [null],
        });

        this.form.get('observacoes')?.patchValue(this.veiculopolicial.observacoes);
        this.form.get('id')?.patchValue(this.veiculopolicial.id);
    }

    cadastrar(){
        this.veiculosPoliciaisService.receber(this.form.value).subscribe({
            next: (data:any) => {
                this.toastr.success('Edição realizada com sucesso!');
                this.form.reset();
                this.refresh.emit();
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        });
    }
}