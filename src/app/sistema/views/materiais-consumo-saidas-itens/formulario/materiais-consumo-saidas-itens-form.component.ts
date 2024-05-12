import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentoEmprestimo } from "../../armamentos-emprestimos/armamento-emprestimo";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { MateriaisConsumoSaidasItensService } from "../materiais-consumo-saidas-itens.service";
import { MateriaisConsumo } from "../../materiais-consumo/material-consumo";
import { MateriaisConsumoService } from "../../materiais-consumo/materiais-consumo.service";

@Component({
    selector: "app-materiais-consumo-saidas-itens-form",
    templateUrl: './materiais-consumo-saidas-itens-form.component.html',
    styleUrl: './materiais-consumo-saidas-itens-form.component.css',
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
export class MateriaisConsumoSaidasItensFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected materiaisconsumo$!: Observable<MateriaisConsumo>;
    private subscription!:any;

    @Input() material_consumo_saida_id!: any;

    @Output('refresh') refresh: EventEmitter<ArmamentoEmprestimo> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisConsumoSaidasItensService: MateriaisConsumoSaidasItensService,
        private materiaisConsumoService: MateriaisConsumoService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'material_consumo': [null, Validators.compose([
                Validators.required,
            ])],
            'material_consumo_saida': [this.material_consumo_saida_id],
            'quantidade': [1, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],             
        });

        this.subscription = this.materiaisConsumoService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.serial){
                        element.serial = `${element.material_consumo_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, Disp: ${element.quantidade}`;
                    }else{
                        element.serial = `${element.material_consumo_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome}, Disp: ${element.quantidade}`;
                    }
                });
                this.materiaisconsumo$ = of(data);
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
            this.materiaisConsumoSaidasItensService.update(this.form.value.id, this.form.value).subscribe({
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
            this.materiaisConsumoSaidasItensService.create(this.form.value).subscribe({
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