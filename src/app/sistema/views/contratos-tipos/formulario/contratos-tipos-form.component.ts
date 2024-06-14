import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContratosTiposService } from "../contratos-tipos.service";
import { ContratoTipo } from "../contrato-tipo";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-contratos-tipos-form",
    templateUrl: './contratos-tipos-form.component.html',
    styleUrl: './contratos-tipos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class ContratosTiposFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<ContratoTipo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private contratosTiposService: ContratosTiposService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])],
            'diarias': [null],
            'servico': [null],
            'fatura': [null]
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.contratosTiposService.update(this.form.value.id, this.form.value).subscribe({
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
            this.contratosTiposService.create(this.form.value).subscribe({
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

    editar(data: ContratoTipo){
        this.form.patchValue(data);
    }

   
}