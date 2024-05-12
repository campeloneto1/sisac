import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Materiais } from "../../materiais/material";
import { MaterialPolicial } from "../../materiais-policiais/material-policial";
import { MateriaisPoliciaisItensService } from "../materiais-policiais-itens.service";
import { MateriaisService } from "../../materiais/materiais.service";

@Component({
    selector: "app-materiais-policiais-itens-form",
    templateUrl: './materiais-policiais-itens-form.component.html',
    styleUrl: './materiais-policiais-itens-form.component.css',
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
export class MateriaisPoliciaisItensFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected materiais$!: Observable<Materiais>;
    private subscription!:any;

    @Input() material_policial_id!: any;

    @Output('refresh') refresh: EventEmitter<MaterialPolicial> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisPoliciaisItensService: MateriaisPoliciaisItensService,
        private materiaisService: MateriaisService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'material': [null, Validators.compose([
                Validators.required,
            ])],
            'material_policial': [this.material_policial_id],
            'quantidade': [1, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],             
        });

        this.subscription = this.materiaisService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.serial){
                        element.serial = `${element.material_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, Disp: ${element.quantidade_disponivel}`;
                    }else {
                        element.serial = `${element.material_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome}, Disp: ${element.quantidade_disponivel}`;
                    }
                });
                this.materiais$ = of(data);
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
            this.materiaisPoliciaisItensService.update(this.form.value.id, this.form.value).subscribe({
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
            this.materiaisPoliciaisItensService.create(this.form.value).subscribe({
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