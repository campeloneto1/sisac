import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ManutencoesTiposService } from "../manutencoes-tipos.service";
import { ManutencaoTipo } from "../manutencao-tipo";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-manutencoes-tipos-form",
    templateUrl: './manutencoes-tipos-form.component.html',
    styleUrl: './manutencoes-tipos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class ManutencoesTiposFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<ManutencaoTipo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private manutencoesTiposService: ManutencoesTiposService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'revisao': [null],
            'troca_oleo': [null],
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.manutencoesTiposService.update(this.form.value.id, this.form.value).subscribe({
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
            this.manutencoesTiposService.create(this.form.value).subscribe({
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

    editar(data: ManutencaoTipo){
        this.form.patchValue(data);
    }

   
}