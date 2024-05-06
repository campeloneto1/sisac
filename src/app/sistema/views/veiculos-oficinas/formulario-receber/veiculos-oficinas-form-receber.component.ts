import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { VeiculosOficinasService } from "../veiculos-oficinas.service";
import { VeiculoOficina } from "../veiculo-oficina";
import { ToastrService } from "ngx-toastr";

import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";

@Component({
    selector: "app-veiculos-oficinas-form-receber",
    templateUrl: './veiculos-oficinas-form-receber.component.html',
    styleUrl: './veiculos-oficinas-form-receber.component.css',
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
export class VeiculosOficinasFormReceberComponent implements OnInit{
    
    protected form!: FormGroup;

    @Input() veiculooficina!: VeiculoOficina;

    @Output('refresh') refresh: EventEmitter<VeiculoOficina> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private veiculosOficinasService: VeiculosOficinasService,
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

        this.form.get('observacoes')?.patchValue(this.veiculooficina.observacoes);
        this.form.get('id')?.patchValue(this.veiculooficina.id);
        
    }

    cadastrar(){
        this.veiculosOficinasService.receber(this.form.value).subscribe({
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