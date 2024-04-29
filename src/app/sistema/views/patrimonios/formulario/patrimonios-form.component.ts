import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PatrimoniosService } from "../patrimonios.service";
import { Patrimonio } from "../patrimonio";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { PatrimoniosTipos } from "../../patrimonios-tipos/patrimonio-tipo";
import { Unidades } from "../../unidades/unidade";
import { Subunidades } from "../../subunidades/subunidade";
import { Setores } from "../../setores/setor";
import { PatrimoniosTiposService } from "../../patrimonios-tipos/patrimonios-tipos.service";
import { UnidadesService } from "../../unidades/unidades.service";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { SetoresService } from "../../setores/setores.service";


@Component({
    selector: "app-patrimonios-form",
    templateUrl: './patrimonios-form.component.html',
    styleUrl: './patrimonios-form.component.css',
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
export class PatrimoniosFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected patrimoniostipos$!: Observable<PatrimoniosTipos>;
    protected unidades$!: Observable<Unidades>;
    protected subunidades$!: Observable<Subunidades>;
    protected setores$!: Observable<Setores>;
    protected selectedtipo: any;

    @Output('refresh') refresh: EventEmitter<Patrimonio> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private patrimoniosService: PatrimoniosService,
        private patrimoniosTiposService:PatrimoniosTiposService,
        private unidadesService:UnidadesService,
        private subunidadesService:SubunidadesService,
        private setoresService:SetoresService,
        private marcasService:MarcasService,
        private modelosService:ModelosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(50)
            ])],
            'serial': [null, Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(50)
            ])],
            'tombo': [null, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50)
            ])],
           
            'data_baixa': [null],
            'observacoes': [null],
            'unidade': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null, Validators.compose([
                Validators.required,
            ])],
            'setor': [null, Validators.compose([
                Validators.required,
            ])],
            'patrimonio_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            
        });
        this.marcas$ = this.marcasService.marcasArmamentos();
        this.patrimoniostipos$ = this.patrimoniosTiposService.index();
        this.unidades$ = this.unidadesService.index();
    }

    cadastrar(){
      
        delete this.form.value.unidade;
        delete this.form.value.subunidade;
        //delete this.form.value.marca;
    
        if(this.form.value.id){
            this.patrimoniosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.patrimoniosService.create(this.form.value).subscribe({
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

    editar(data: Patrimonio){
        this.form.patchValue(data);
        if(data.setor){
            this.form.get('setor')?.patchValue(data.setor.id);
            this.form.get('subunidade')?.patchValue(data.setor.subunidade.id);
            this.form.get('unidade')?.patchValue(data.setor.subunidade.unidade.id);
            this.getSubunidades();
            this.getSetores();
        }
        if(data.patrimonio_tipo){
            this.form.get('patrimonio_tipo')?.patchValue(data.patrimonio_tipo.id);
        }
    }

     getSubunidades(){
        this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
     }

     getSetores(){
        this.setores$ = this.setoresService.whereSubunidade(this.form.get('subunidade')?.value);
     }

     getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.get('marca')?.value);
     }
}