import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ArmamentoEmprestimo } from "../armamento-emprestimo";
import { ArmamentosEmprestimosService } from "../armamentos-emprestimos.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "../../users/users.service";
import { InputTextComponent } from "../../../components/input-text/input-text.component";

@Component({
    selector: 'app-armamentos-emprestimos-form-receber',
    templateUrl: './armamentos-emprestimos-form-receber.component.html',
    styleUrl: './armamentos-emprestimos-form-receber.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputTextareaComponent
    ]
})
export class ArmamentosEmprestimosFormReceberComponent implements OnInit{


    protected formdev!: FormGroup;

    protected solicitarsenha: boolean = false;
    protected senhaverificada: number = 1;

    protected arms:any = [];

    @Input() armamentoEmprestimo!: ArmamentoEmprestimo;

    @Output('refresh') refresh: EventEmitter<ArmamentoEmprestimo> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private armamentosEmprestimosService: ArmamentosEmprestimosService,
        private toastr: ToastrService,
        private usersService: UsersService
    ){}
    
    ngOnInit(): void {
        
        this.formdev = this.formBuilder.group({
            'id': [null],
            'observacoes': [this.armamentoEmprestimo.observacoes],  
            'armamentos': [null],   
            'password': [null],    
            'policial': [null]       
        });
    }

    cadastrar(){
        //var arms:any = [];
        
        this.formdev.get('armamentos')?.patchValue(this.arms)
        this.formdev.get('id')?.patchValue(this.armamentoEmprestimo.id)

        this.armamentosEmprestimosService.receber(this.formdev.value).subscribe({
            next: (data) => {
                this.toastr.success('Edição realizada com sucesso!');
                this.formdev.reset();
                this.refresh.emit();
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        })
    }

    solsenha(){
        const formElements = document.querySelectorAll('#formdev input')
        Array.from(formElements).forEach((element) => {
            if(element.id){
                this.arms.push(
                    {
                        id: element.id,
                        //@ts-ignore
                       quantidade: parseInt(element.value)
                    }
                )
            }

        });
        this.solicitarsenha = true;
    }

    verificarsenha(){
        let obj = {
            id: this.armamentoEmprestimo.policial.id,
            password:  this.formdev.value.password,
        }

        this.usersService.verificarSenha(obj).subscribe({
            next: (data) => {
                if(data){
                    this.senhaverificada = 2;
                    this.toastr.success('Senha verificada');
                }else{
                    this.toastr.error('Senha incorreta');
                    this.senhaverificada = 3;
                }
            },
            error: (error) => {
                console.error(error);
            }
        })
    }
}