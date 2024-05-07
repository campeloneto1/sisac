import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MateriaisConsumoTiposService } from "../materiais-consumo-tipos.service";
import { MaterialConsumoTipo } from "../material-consumo-tipo";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-materiais-consumo-tipos-form",
    templateUrl: './materiais-consumo-tipos-form.component.html',
    styleUrl: './materiais-consumo-tipos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class MateriaisConsumoTiposFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<MaterialConsumoTipo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisConsumoTiposService: MateriaisConsumoTiposService,
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
          
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.materiaisConsumoTiposService.update(this.form.value.id, this.form.value).subscribe({
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
            this.materiaisConsumoTiposService.create(this.form.value).subscribe({
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

    editar(data: MaterialConsumoTipo){
        this.form.patchValue(data);
    }

   
}