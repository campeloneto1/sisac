import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { EstadosService } from "../estados.service";
import { Estado } from "../estado";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { PaisesService } from "../../paises/paises.service";
import { Observable } from "rxjs";
import { Paises, Pais } from "../../paises/pais";

@Component({
    selector: "app-estados-form",
    templateUrl: './estados-form.component.html',
    styleUrl: './estados-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class EstadosFormComponent implements OnInit{
    
    form!: FormGroup;

    protected paises$!: Observable<Paises>;

    @Output('refresh') refresh: EventEmitter<Estado> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private estadosService: EstadosService,
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
            'pais': [null, Validators.compose([
                Validators.required,
                
            ])],
        });

        this.paises$ = this.paisesService.index();
    }

    cadastrar(){
        if(this.form.value.id){
            this.estadosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.estadosService.create(this.form.value).subscribe({
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

    editar(data: Estado){
        this.form.patchValue(data);
        this.form.get('pais')?.patchValue(data.pais.id);
    }

   
}