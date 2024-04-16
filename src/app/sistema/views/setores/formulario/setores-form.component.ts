import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { SetoresService } from "../setores.service";
import { Setor } from "../setor";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

import { UnidadesService } from "../../unidades/unidades.service";
import { Unidades } from "../../unidades/unidade";
import { Subunidades } from "../../subunidades/subunidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";


@Component({
    selector: "app-setores-form",
    templateUrl: './setores-form.component.html',
    styleUrl: './setores-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class SetoresFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected unidades$!: Observable<Unidades>;
    protected subunidades$!: Observable<Subunidades>;

    @Output('refresh') refresh: EventEmitter<Setor> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private setoresService: SetoresService,
        private unidadesService:UnidadesService,
        private subunidadesService:SubunidadesService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'abreviatura': [null, Validators.compose([                
                Validators.minLength(2),
                Validators.maxLength(10)
            ])],
            'telefone': [null, Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'email': [null, Validators.compose([
                Validators.maxLength(100)
            ])],
            'unidade': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null, Validators.compose([
                Validators.required,
            ])],
        });
        this.unidades$ = this.unidadesService.index();
    }

    cadastrar(){
      
      
        delete this.form.value.pais;
        delete this.form.value.estado;
        delete this.form.value.unidade;
    
        if(this.form.value.id){
            this.setoresService.update(this.form.value.id, this.form.value).subscribe({
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
            this.setoresService.create(this.form.value).subscribe({
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

    editar(data: Setor){
        this.form.patchValue(data);
        if(data.subunidade){
            this.form.get('unidade')?.patchValue(data.subunidade.unidade.id);
            this.form.get('subunidade')?.patchValue(data.subunidade.id);
        }
        
    }

    getSubunidades(){
        this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
    }
}