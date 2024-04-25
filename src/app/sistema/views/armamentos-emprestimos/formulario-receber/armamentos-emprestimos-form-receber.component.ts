import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ArmamentoEmprestimo } from "../armamento-emprestimo";
import { ArmamentosEmprestimosService } from "../armamentos-emprestimos.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-armamentos-emprestimos-form-receber',
    templateUrl: './armamentos-emprestimos-form-receber.component.html',
    styleUrl: './armamentos-emprestimos-form-receber.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextareaComponent
    ]
})
export class ArmamentosEmprestimosFormReceberComponent implements OnInit{


    protected form!: FormGroup;

    @Input() armamentoEmprestimo!: ArmamentoEmprestimo;

    @Output('refresh') refresh: EventEmitter<ArmamentoEmprestimo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private armamentosEmprestimosService: ArmamentosEmprestimosService,
        private toastr: ToastrService,
    ){}
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [null],
            'observacoes': [this.armamentoEmprestimo.observacoes],  
            'armamentos': [null],                  
        });
    }

    cadastrar(){
        var arms:any = [];
        const formElements = document.querySelectorAll('#formdev input')
        Array.from(formElements).forEach((element) => {
            if(element.id){
                arms.push(
                    {
                        id: element.id,
                        //@ts-ignore
                       quantidade: parseInt(element.value)
                    }
                )
            }

        });
        this.form.get('armamentos')?.patchValue(arms)
        this.form.get('id')?.patchValue(this.armamentoEmprestimo.id)

        this.armamentosEmprestimosService.receber(this.form.value).subscribe({
            next: (data) => {
                this.toastr.success('Edição realizada com sucesso!');
                this.form.reset();
                this.refresh.emit();
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        })
    }
}