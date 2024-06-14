import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmpresasService } from "../empresas.service";
import { Empresa } from "../empresa";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { UnidadesService } from "../../unidades/unidades.service";
import { PaisesService } from "../../paises/paises.service";
import { EstadosService } from "../../estados/estados.service";
import { CidadesService } from "../../cidades/cidades.service";
import { Paises } from "../../paises/pais";
import { Estados } from "../../estados/estado";
import { Cidades } from "../../cidades/cidade";
import { Unidades } from "../../unidades/unidade";
import { PoliciaisService } from "../../policiais/policiais.service";
import { Policiais } from "../../policiais/policial";


@Component({
    selector: "app-empresas-form",
    templateUrl: './empresas-form.component.html',
    styleUrl: './empresas-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class EmpresasFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;

    private subscription:any;

    @Output('refresh') refresh: EventEmitter<Empresa> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private paisesService:PaisesService,
        private estadosService:EstadosService,
        private cidadesService:CidadesService,
        private empresasService: EmpresasService,
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
            'nome_fantasia': [null, Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'cnpj': [null, Validators.compose([
               
                Validators.maxLength(15),
                Validators.required,
            ])],
            'telefone1': [null, Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'telefone2': [null, Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'email': [null, Validators.compose([
                Validators.maxLength(100),
                Validators.email
            ])],
            'gerente': [null, Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(100)
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
            'subunidade': [null],
           
        });
        this.paises$ = this.paisesService.index();
        
    }

    ngOnDestroy(): void {
        
    }

    cadastrar(){
      
       
        delete this.form.value.pais;
        delete this.form.value.estado;
       
        if(this.form.value.id){
            this.empresasService.update(this.form.value.id, this.form.value).subscribe({
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
            this.empresasService.create(this.form.value).subscribe({
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

    editar(data: Empresa){
        this.form.patchValue(data);
     
        if(data.cidade){
            this.form.get('pais')?.patchValue(data.cidade.estado.pais.id);
            this.form.get('estado')?.patchValue(data.cidade.estado.id);
            this.form.get('cidade')?.patchValue(data.cidade.id);
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