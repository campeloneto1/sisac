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
    protected editando: boolean = false;
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
            'quantidade': [1, Validators.compose([
                Validators.min(1),
            ])],
            'observacoes': [null],  
            'armamentos': [null],                  
        });

        this.subscription = this.policiaisService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.numeral){
                        element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
                    }else{
                        element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}`;
                    }
                    
                });
                this.policiais$ = of(data);
            }
        });

        this.subscription2 = this.armamentosService.disponiveis().subscribe({
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
        this.editando = false;
        this.form.get('quantidade')?.patchValue(1);
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
        this.form.get('armamentos')?.patchValue(this.armamentosselected);
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
        this.editando = true;
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
    }

    addArmamento(){
        let arma;
        this.armamentos$.subscribe((data) => {
            arma =  data.filter((element) => {
                return element.id == this.form.value.armamento
            })
        });
        this.armamentosselected.push(
            {
                armamentoId: this.form.value.armamento,
                //@ts-ignore
                armamento: arma[0],
                quantidade: this.form.value.quantidade  
            }
        );
        this.form.get('armamento')?.patchValue(null);
    }

    removeArmamento(index:number){
        this.armamentosselected.splice(index, 1);
    }
   
}