import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentoEmprestimo } from "../../armamentos-emprestimos/armamento-emprestimo";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Armamentos } from "../../armamentos/armamento";
import { ArmamentosEmprestimosItensService } from "../armamentos-emprestimos-itens.service";
import { ArmamentosService } from "../../armamentos/armamentos.service";

@Component({
    selector: "app-armamentos-emprestimos-itens-form",
    templateUrl: './armamentos-emprestimos-itens-form.component.html',
    styleUrl: './armamentos-emprestimos-itens-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        InputTextareaComponent
    ]
})
export class ArmamentosEmprestimosItensFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected armamentos$!: Observable<Armamentos>;
    private subscription!:any;

    @Input() armamento_emprestimo_id!: any;

    @Output('refresh') refresh: EventEmitter<ArmamentoEmprestimo> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService,
        private armamentosService: ArmamentosService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'armamento': [null, Validators.compose([
                Validators.required,
            ])],
            'armamento_emprestimo': [this.armamento_emprestimo_id],
            'quantidade': [1, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],             
        });

        this.subscription = this.armamentosService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.armamento_calibre){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, ${element.armamento_calibre?.nome}, Disp: ${element.quantidade_disponivel}`;
                    }else if(element.armamento_tamanho){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, ${element.armamento_tamanho?.nome}, Disp: ${element.quantidade_disponivel}`;
                    }else if(!element.armamento_tamanho && !element.armamento_calibre){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, Disp: ${element.quantidade_disponivel}`;
                    }
                });
                this.armamentos$ = of(data);
            }
        });
    }

    reset(){
        this.form.reset();
        this.form.get('quantidade')?.patchValue(1);
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        if(this.form.value.id){
            this.armamentosEmprestimosItensService.update(this.form.value.id, this.form.value).subscribe({
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
            this.armamentosEmprestimosItensService.create(this.form.value).subscribe({
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

    cancelar(){
        this.form.reset();
        this.cancel.emit();
    }
   
}