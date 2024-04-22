import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentosTamanhosService } from "../armamentos-tamanhos.service";
import { ArmamentoTamanho } from "../armamento-tamanho";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-armamentos-tamanhos-form",
    templateUrl: './armamentos-tamanhos-form.component.html',
    styleUrl: './armamentos-tamanhos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class ArmamentosTamanhosFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<ArmamentoTamanho> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosTamanhosService: ArmamentosTamanhosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ])],
          
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.armamentosTamanhosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.armamentosTamanhosService.create(this.form.value).subscribe({
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

    editar(data: ArmamentoTamanho){
        this.form.patchValue(data);
    }

   
}