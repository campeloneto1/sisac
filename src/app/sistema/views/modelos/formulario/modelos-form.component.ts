import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ModelosService } from "../modelos.service";
import { Modelo } from "../modelo";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { MarcasService } from "../../marcas/marcas.service";
import { Observable } from "rxjs";
import { Marcas } from "../../marcas/marca";

@Component({
    selector: "app-modelos-form",
    templateUrl: './modelos-form.component.html',
    styleUrl: './modelos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class ModelosFormComponent implements OnInit{
    
    form!: FormGroup;

    protected marcas$!: Observable<Marcas>;

    @Output('refresh') refresh: EventEmitter<Modelo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private modelosService: ModelosService,
        private marcasService: MarcasService,
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
                Validators.minLength(2),
                Validators.maxLength(5)
            ])],
            'marca': [null, Validators.compose([
                Validators.required,
                
            ])],
        });

        this.marcas$ = this.marcasService.index();
    }

    cadastrar(){
        if(this.form.value.id){
            this.modelosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.modelosService.create(this.form.value).subscribe({
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

    editar(data: Modelo){
        this.form.patchValue(data);
        this.form.get('marca')?.patchValue(data.marca.id);
    }

   
}