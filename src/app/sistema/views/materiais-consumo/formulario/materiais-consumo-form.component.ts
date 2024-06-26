import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MateriaisConsumoService } from "../materiais-consumo.service";
import { MaterialConsumo } from "../material-consumo";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { MateriaisConsumoTipos } from "../../materiais-consumo-tipos/material-consumo-tipo";
import { MateriaisConsumoTiposService } from "../../materiais-consumo-tipos/materiais-consumo-tipos.service";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";


@Component({
    selector: "app-materiais-consumo-form",
    templateUrl: './materiais-consumo-form.component.html',
    styleUrl: './materiais-consumo-form.component.css',
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
export class MateriaisConsumoFormComponent implements OnInit{
    protected user!: User;
    protected form!: FormGroup;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected materiaisconsumotipos$!: Observable<MateriaisConsumoTipos>;

    protected editando: boolean = false;

    @Output('refresh') refresh: EventEmitter<MaterialConsumo> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisConsumoService: MateriaisConsumoService,
        private materiaisConsumoTiposService:MateriaisConsumoTiposService,
        private marcasService:MarcasService,
        private modelosService:ModelosService,
        private sessionService: SessionService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.user = this.sessionService.getUser();
        this.form = this.formBuilder.group({
            'id': [null],
            'serial': [null, Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'quantidade': [null, Validators.compose([                
                Validators.min(1),
                Validators.required
            ])],
            'quantidade_alerta': [null, Validators.compose([                
                Validators.min(1),
            ])],
            'data_validade': [null],
            'data_baixa': [null],
            'observacoes': [null],
            'marca': [null, Validators.compose([
                Validators.required,
            ])],
            'modelo': [null, Validators.compose([
                Validators.required,
            ])],
            'material_consumo_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null],
        });
        //this.unidades$ = this.unidadesService.index();
        this.marcas$ = this.marcasService.marcasLogistica();
        this.materiaisconsumotipos$ = this.materiaisConsumoTiposService.index();
       
    }

    cadastrar(){
      
        //delete this.form.value.unidade;
        
    
        if(this.form.value.id){
            if(!this.form.value.data_baixa){
                this.form.get('data_baixa')?.patchValue(null);
            }
            if(!this.form.value.data_validade){
                this.form.get('data_validade')?.patchValue(null);
            }
            delete this.form.value.marca;
            this.materiaisConsumoService.update(this.form.value.id, this.form.value).subscribe({
                next: (data:any) => {
                    this.toastr.success('Edição realizada com sucesso!');
                    this.form.reset();
                    this.refresh.emit();
                    this.editando = false;
                },
                error: (error:any) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            });
        }else{
            delete this.form.value.marca;
            if(this.sessionService.getSubunidade()){
                this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
            }else{
                this.toastr.error('Selecione uma subunidade!');
            }
            this.materiaisConsumoService.create(this.form.value).subscribe({
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

    editar(data: MaterialConsumo){
        this.editando = true;
        this.form.patchValue(data);
        if(data.modelo){
            this.form.get('marca')?.patchValue(data.modelo.marca.id);
            this.form.get('modelo')?.patchValue(data.modelo.id);
            this.getModelos();
        }
        if(data.material_consumo_tipo){
            this.form.get('material_consumo_tipo')?.patchValue(data.material_consumo_tipo.id);
        }
       
    }

    cancelar(){
        this.form.reset();
        this.editando = false;
        this.cancel.emit();
    }

    resetForm(){
        this.editando = false;
        this.form.reset();
    }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.get('marca')?.value);
    }

}