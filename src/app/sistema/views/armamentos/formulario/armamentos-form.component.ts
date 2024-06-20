import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentosService } from "../armamentos.service";
import { Armamento } from "../armamento";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { ArmamentosTiposService } from "../../armamentos-tipos/armamentos-tipos.service";
import { ArmamentosTamanhosService } from "../../armamentos-tamanhos/armamentos-tamanhos.service";
import { ArmamentosCalibresService } from "../../armamentos-calibres/armamentos-calibres.service";
import { MarcasService } from "../../marcas/marcas.service";
import { ModelosService } from "../../modelos/modelos.service";
import { Marcas } from "../../marcas/marca";
import { Modelos } from "../../modelos/modelo";
import { ArmamentoTipo, ArmamentosTipos } from "../../armamentos-tipos/armamento-tipo";
import { ArmamentosCalibres } from "../../armamentos-calibres/armamento-calibre";
import { ArmamentosTamanhos } from "../../armamentos-tamanhos/armamento-tamanho";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Unidades } from "../../unidades/unidade";
import { Subunidades } from "../../subunidades/subunidade";
import { UnidadesService } from "../../unidades/unidades.service";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { StorageService } from "../../../storage.service";


@Component({
    selector: "app-armamentos-form",
    templateUrl: './armamentos-form.component.html',
    styleUrl: './armamentos-form.component.css',
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
export class ArmamentosFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected marcas$!: Observable<Marcas>;
    protected modelos$!: Observable<Modelos>;
    protected armamentostipos$!: Observable<ArmamentosTipos>;
    protected armamentoscalibres$!: Observable<ArmamentosCalibres>;
    protected armamentostamanhos$!: Observable<ArmamentosTamanhos>;
    protected selectedtipo: any;
    protected armamentostipos!: ArmamentosTipos;

    protected editando:boolean = false;

    @Output('refresh') refresh: EventEmitter<Armamento> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosService: ArmamentosService,
        private armamentosTiposService:ArmamentosTiposService,
        private armamanetosTamanhosService:ArmamentosTamanhosService,
        private armamentosCalibresService:ArmamentosCalibresService,
        private storageService: StorageService,
        private marcasService:MarcasService,
        private modelosService:ModelosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'serial': [null, Validators.compose([
                Validators.required,
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
            'armamento_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'armamento_calibre': [null],
            'armamento_tamanho': [null],
            'subunidade': [null],
        });
        //this.unidades$ = this.unidadesService.index();
        this.marcas$ = this.marcasService.marcasArmamentos();
        this.armamentostipos$ = this.armamentosTiposService.index();
    }

    cadastrar(){
      
        delete this.form.value.unidade;
        delete this.form.value.marca;
        if(this.storageService.getItem('subunidade')){
            this.form.get('subunidade')?.patchValue(this.storageService.getItem('subunidade'));
        }
        if(this.form.value.id){
            if(!this.form.value.data_baixa){
                this.form.get('data_baixa')?.patchValue(null);
            }
            if(!this.form.value.data_validade){
                this.form.get('data_validade')?.patchValue(null);
            }
            delete this.form.value.marca;
          
            this.armamentosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.armamentosService.create(this.form.value).subscribe({
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

    editar(data: Armamento){
        this.editando = true;
        this.form.patchValue(data);

        if(data.modelo){
            this.form.get('marca')?.patchValue(data.modelo.marca.id);
            this.form.get('modelo')?.patchValue(data.modelo.id);
            this.getModelos();
        }
        if(data.armamento_tipo){
            this.form.get('armamento_tipo')?.patchValue(data.armamento_tipo.id);
        }
        if(data.armamento_tamanho){
            this.form.get('armamento_tamanho')?.patchValue(data.armamento_tamanho.id);
        }
        if(data.armamento_calibre){
            this.form.get('armamento_calibre')?.patchValue(data.armamento_calibre.id);
        }
    }

    cancelar(){
        this.form.reset();
        this.cancel.emit();
    }

    resetForm(){
        this.form.reset();
        this.editando = false;
    }

    // getSubunidades(){
    //     this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
    // }

    getModelos(){
        this.modelos$ = this.modelosService.whereMarca(this.form.get('marca')?.value);
    }

    getTamCal(){
        
        this.armamentostipos$.subscribe((data) => {
            data.forEach((value:ArmamentoTipo) => {
                if(value.id == this.form.value.armamento_tipo){
                    if(value.calibres){
                        this.armamentoscalibres$ = this.armamentosCalibresService.index();
                        this.armamentostamanhos$ = of();
                    }else{
                        this.armamentostamanhos$ = this.armamanetosTamanhosService.index();
                        this.armamentoscalibres$ = of();
                    }
                }
            })
        })
       
       
    }
}