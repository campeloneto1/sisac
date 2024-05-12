import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MateriaisService } from "../materiais.service";
import { Materiais, Material } from "../material";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { MateriaisTiposService } from "../../materiais-tipos/materiais-tipos.service";
import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { MateriaisTipos, MaterialTipo } from "../../materiais-tipos/material-tipo";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";


@Component({
    selector: "app-materiais-form",
    templateUrl: './materiais-form.component.html',
    styleUrl: './materiais-form.component.css',
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
export class MateriaisFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected materiaistipos$!: Observable<MateriaisTipos>;
    protected selectedtipo: any;
    protected materiaistipos!: MateriaisTipos;

    @Output('refresh') refresh: EventEmitter<Material> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisService: MateriaisService,
        private materiaisTiposService:MateriaisTiposService,
        private marcasService:MarcasService,
        private modelosService:ModelosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
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
            'data_validade': [null],
            'data_baixa': [null],
            'observacoes': [null],
            'marca': [null, Validators.compose([
                Validators.required,
            ])],
            'modelo': [null, Validators.compose([
                Validators.required,
            ])],
            'material_tipo': [null, Validators.compose([
                Validators.required,
            ])],
        });
        //this.unidades$ = this.unidadesService.index();
        this.marcas$ = this.marcasService.marcasLogistica();
        this.materiaistipos$ = this.materiaisTiposService.index();
       
    }

    cadastrar(){
        delete this.form.value.marca;
        if(this.form.value.id){
            
            if(!this.form.value.data_baixa){
                this.form.get('data_baixa')?.patchValue(null);
            }
            this.materiaisService.update(this.form.value.id, this.form.value).subscribe({
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
            this.materiaisService.create(this.form.value).subscribe({
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

    editar(data: Material){
        this.form.patchValue(data);
        if(data.modelo){
            this.form.get('marca')?.patchValue(data.modelo.marca.id);
            this.form.get('modelo')?.patchValue(data.modelo.id);
            this.getModelos();
        }
        if(data.material_tipo){
            this.form.get('material_tipo')?.patchValue(data.material_tipo.id);
        }
    }

    // getSubunidades(){
    //     this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
    // }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.get('marca')?.value);
    }

}