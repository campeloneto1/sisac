import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContratosObjetosService } from "../contratos-objetos.service";
import { ContratoObjeto } from "../contrato-objeto";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-contratos-objetos-form",
    templateUrl: './contratos-objetos-form.component.html',
    styleUrl: './contratos-objetos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class ContratosObjetosFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<ContratoObjeto> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private contratosObjetosService: ContratosObjetosService,
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
          
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.contratosObjetosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.contratosObjetosService.create(this.form.value).subscribe({
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

    editar(data: ContratoObjeto){
        this.form.patchValue(data);
    }

   
}