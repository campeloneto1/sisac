import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentosEmprestimosService } from "../armamentos-emprestimos.service";
import { ArmamentoEmprestimo } from "../armamento-emprestimo";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Armamentos } from "../../armamentos/armamento";
import { ArmamentosService } from "../../armamentos/armamentos.service";

@Component({
    selector: "app-armamentos-emprestimos-form",
    templateUrl: './armamentos-emprestimos-form.component.html',
    styleUrl: './armamentos-emprestimos-form.component.css',
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
export class ArmamentosEmprestimosFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;
    protected armamentos$!: Observable<Armamentos>;
    protected armamentosselected:any = [];
    private subscription!:any;
    private subscription2!:any;

    @Output('refresh') refresh: EventEmitter<ArmamentoEmprestimo> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosEmprestimosService: ArmamentosEmprestimosService,
        private policiaisService: PoliciaisService,
        private armamentosService: ArmamentosService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],
            'armamento': [null],
            'quantidade': [null, Validators.compose([
                Validators.min(1),
            ])],
            'observacoes': [null],  
            'armamentos': [null],                  
        });

        this.subscription = this.policiaisService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    element.nome = `${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
                });
                this.policiais$ = of(data);
            }
        });

        this.subscription2 = this.armamentosService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.armamento_calibre){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, ${element.armamento_calibre?.nome}`;
                    }else if(element.armamento_tamanho){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, ${element.armamento_tamanho?.nome}`;
                    }else if(!element.armamento_tamanho && !element.armamento_calibre){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}`;
                    }
                });
                this.armamentos$ = of(data);
            }
        });
    }

    ngOnDestroy(): void {
        
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    cadastrar(){
        if(this.form.value.id){
            this.armamentosEmprestimosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.armamentosEmprestimosService.create(this.form.value).subscribe({
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

    editar(data: ArmamentoEmprestimo){
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
    }

    addArmamento(){
        this.armamentosselected.push(
            {
                armamento: this.form.value.armamento,
                quantidade: this.form.value.quantidade  
            }
        );
        console.log(this.armamentosselected)
    }
   
}