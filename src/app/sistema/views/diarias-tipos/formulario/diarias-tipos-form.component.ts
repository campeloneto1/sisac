import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DiariasTiposService } from "../diarias-tipos.service";
import { DiariaTipo, DiariasTipos } from "../diaria-tipo";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-diarias-tipos-form",
    templateUrl: './diarias-tipos-form.component.html',
    styleUrl: './diarias-tipos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class DiariasTiposFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<DiariasTipos> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private diarisTiposService: DiariasTiposService,
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
            'valor': [null, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],
            'ajuda_custo': [null]
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.diarisTiposService.update(this.form.value.id, this.form.value).subscribe({
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
            this.diarisTiposService.create(this.form.value).subscribe({
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

    editar(data: DiariaTipo){
        this.form.patchValue(data);
    }

   
}