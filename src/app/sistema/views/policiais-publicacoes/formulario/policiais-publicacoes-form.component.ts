import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisPublicacoesService } from "../policiais-publicacoes.service";
import { PolicialPublicacao } from "../policial-publicacao";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { PublicacoesTiposService } from "../../publicacoes-tipos/publicacoes-tipos.service";
import { PublicacoesTipos } from "../../publicacoes-tipos/publicacao-tipo";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";

@Component({
    selector: "app-policiais-publicacoes-form",
    templateUrl: './policiais-publicacoes-form.component.html',
    styleUrl: './policiais-publicacoes-form.component.css',
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
export class PoliciaisPublicacoesFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;
    protected publicacoesTipos$!: Observable<PublicacoesTipos>;

    private subscription!:any;

    @Output('refresh') refresh: EventEmitter<PolicialPublicacao> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private policiaisPublicacoesService: PoliciaisPublicacoesService,
        private policiaisService: PoliciaisService,
        private publicacoesTiposService: PublicacoesTiposService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],
            'publicacao_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'texto': [null, Validators.compose([
                Validators.required,
            ])],
            'boletim': [null, Validators.compose([
                Validators.maxLength(30),
                Validators.required,
            ])],        
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

        this.publicacoesTipos$ = this.publicacoesTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        if(this.form.value.id){
            this.policiaisPublicacoesService.update(this.form.value.id, this.form.value).subscribe({
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
            this.policiaisPublicacoesService.create(this.form.value).subscribe({
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

    editar(data: PolicialPublicacao){
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
        this.form.get('publicacao_tipo')?.patchValue(data.publicacao_tipo.id);
    }

   
}