import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UnidadesService } from "../unidades.service";
import { Unidade } from "../unidade";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

import { PaisesService } from "../../paises/paises.service";
import { EstadosService } from "../../estados/estados.service";
import { CidadesService } from "../../cidades/cidades.service";
import { Paises } from "../../paises/pais";
import { Estados } from "../../estados/estado";
import { Cidades } from "../../cidades/cidade";


@Component({
    selector: "app-unidades-form",
    templateUrl: './unidades-form.component.html',
    styleUrl: './unidades-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class UnidadesFormComponent implements OnInit{
    
    protected form!: FormGroup;

    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;

    @Output('refresh') refresh: EventEmitter<Unidade> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private unidadesService: UnidadesService,
        private paisesService:PaisesService,
        private estadosService:EstadosService,
        private cidadesService:CidadesService,
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
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(10)
            ])],
            'telefone': [null, Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'email': [null, Validators.compose([
                Validators.maxLength(100),
                Validators.email
            ])],
            'rua': [null, Validators.compose([
                Validators.maxLength(100)
            ])],
            'numero': [null, Validators.compose([
                Validators.maxLength(20)
            ])],
            'bairro': [null, Validators.compose([
                Validators.maxLength(100)
            ])],
            'cep': [null, Validators.compose([
                Validators.maxLength(8)
            ])],
            'pais': [null],
            'estado': [null],
            'cidade': [null],
        });
        this.paises$ = this.paisesService.index();
    }

    cadastrar(){
      
       
        delete this.form.value.pais;
        delete this.form.value.estado;
      
        if(this.form.value.id){
            this.unidadesService.update(this.form.value.id, this.form.value).subscribe({
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
            this.unidadesService.create(this.form.value).subscribe({
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

    editar(data: Unidade){
        this.form.patchValue(data);
        if(data.cidade){
            this.form.get('pais')?.patchValue(data.cidade.estado.pais.id);
            this.form.get('estado')?.patchValue(data.cidade.estado.id)
            this.form.get('cidade')?.patchValue(data.cidade.id)
            this.getEstados();
            this.getCidades();
        }
        
    }

    getEstados(){
        this.estados$ = this.estadosService.wherePais(this.form.get('pais')?.value);
    }

    getCidades(){
        this.cidades$ = this.cidadesService.whereEstado(this.form.get('estado')?.value);
    }

   
}