import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PaisesService } from "../paises.service";
import { Pais } from "../pais";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-paises-form",
    templateUrl: './paises-form.component.html',
    styleUrl: './paises-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class PaisesFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<Pais> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private paisesService: PaisesService,
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
            'abreviatura': [null, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(5)
            ])],
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.paisesService.update(this.form.value.id, this.form.value).subscribe({
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
            this.paisesService.create(this.form.value).subscribe({
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

    editar(data: Pais){
        this.form.patchValue(data);
    }

   
}