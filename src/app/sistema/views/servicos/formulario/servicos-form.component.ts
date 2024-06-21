import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Servico } from "../servico";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { EmpresasService } from "../../empresas/empresas.service";
import { Empresas } from "../../empresas/empresa";
import { SessionService } from "../../../session.service";
import { ServicosTipos } from "../../servicos-tipos/servico-tipo";
import { ServicosService } from "../servicos.service";
import { ServicosTiposService } from "../../servicos-tipos/servicos-tipos.service";

@Component({
    selector: "app-servicos-form",
    templateUrl: './servicos-form.component.html',
    styleUrl: './servicos-form.component.css',
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
export class ServicosFormComponent implements OnInit, OnDestroy{
    
    form!: FormGroup;

    protected servicostipos$!: Observable<ServicosTipos>;
    protected empresas$!: Observable<Empresas>;

    private subscription:any;
    private subscription2:any;

    @Output('refresh') refresh: EventEmitter<Servico> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private servicosService: ServicosService,
        private empresasService: EmpresasService,
        private servicosTiposService: ServicosTiposService,
        private toastr: ToastrService,
        private sessionService: SessionService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'subunidade': [null],
            'empresa': [null, Validators.compose([
                Validators.required,
            ])],
            'data_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'data_final': [null],
            'servico_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'observacoes': [null],
        });

        this.subscription2 = this.empresasService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.nome_fantasia){
                        element.nome = `${element.nome_fantasia}, ${element.cnpj} `;
                    }else{
                        element.nome = `${element.nome}, ${element.cnpj}`;
                    }
                });
                this.empresas$ = of(data);
            }
        });
       
        this.servicostipos$ = this.servicosTiposService.index();
       
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
            this.servicosService.update(this.form.value.id, this.form.value).subscribe({
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
            if(this.sessionService.getSubunidade()){
                this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
            }else{
                this.toastr.error('Selecione uma subunidade!');
            }
            this.servicosService.create(this.form.value).subscribe({
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

    editar(data: Servico){
        this.form.patchValue(data);
        if(data.empresa){
            this.form.get('empresa')?.patchValue(data.empresa.id);
        }
    }
}