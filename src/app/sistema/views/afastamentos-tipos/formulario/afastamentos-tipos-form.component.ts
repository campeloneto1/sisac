import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AfastamentosTiposService } from "../afastamentos-tipos.service";
import { AfastamentoTipo } from "../afastamento-tipo";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-afastamentos-tipos-form",
    templateUrl: './afastamentos-tipos-form.component.html',
    styleUrl: './afastamentos-tipos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class AfastamentosTiposFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<AfastamentoTipo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private afastamentosTiposService: AfastamentosTiposService,
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
            'atestado': [null]
          
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.afastamentosTiposService.update(this.form.value.id, this.form.value).subscribe({
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
            this.afastamentosTiposService.create(this.form.value).subscribe({
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

    editar(data: AfastamentoTipo){
        this.form.patchValue(data);
    }

   
}