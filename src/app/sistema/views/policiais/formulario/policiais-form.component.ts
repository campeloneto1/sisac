import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisService } from "../policiais.service";
import { Policial } from "../policial";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

import { UnidadesService } from "../../unidades/unidades.service";
import { PaisesService } from "../../paises/paises.service";
import { EstadosService } from "../../estados/estados.service";
import { CidadesService } from "../../cidades/cidades.service";
import { Paises } from "../../paises/pais";
import { Estados } from "../../estados/estado";
import { Cidades } from "../../cidades/cidade";
import { Unidades } from "../../unidades/unidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { SetoresService } from "../../setores/setores.service";
import { SexosService } from "../../sexos/sexos.service";
import { GraduacoesService } from "../../graduacoes/graduacoes.service";
import { Subunidades } from "../../subunidades/subunidade";
import { Setores } from "../../setores/setor";
import { Graduacoes } from "../../graduacoes/graduacao";
import { Sexos } from "../../sexos/sexo";


@Component({
    selector: "app-policiais-form",
    templateUrl: './policiais-form.component.html',
    styleUrl: './policiais-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class PoliciaisFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected unidades$!: Observable<Unidades>;
    protected subunidades$!: Observable<Subunidades>;
    protected setores$!: Observable<Setores>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;
    protected graduacoes$!: Observable<Graduacoes>;
    protected sexos$!: Observable<Sexos>;

    @Output('refresh') refresh: EventEmitter<Policial> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private policiaisService: PoliciaisService,
        private unidadesService:UnidadesService,
        private subunidadesService:SubunidadesService,
        private setoresService:SetoresService,
        private graduacoesService:GraduacoesService,
        private sexosService:SexosService,
        private paisesService:PaisesService,
        private estadosService:EstadosService,
        private cidadesService:CidadesService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'graduacao': [null, Validators.compose([
                Validators.required,
            ])],
            'numeral': [null, Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(10)
            ])],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'nome_guerra': [null, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50)
            ])],
            'matricula': [null, Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ])],
            'cpf': [null, Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11)
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
            'data_nascimento': [null],
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
            'unidade': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null, Validators.compose([
                Validators.required,
            ])],
            'setor': [null, Validators.compose([
                Validators.required,
            ])],
            'data_inclusao': [null],
            'data_apresentacao': [null, Validators.compose([
                Validators.required,
            ])],
            'boletim_inclusao': [null],
            'boletim_apresentacao': [null, Validators.compose([
                Validators.required,
            ])],
            'boletim_transferencia': [null],
        });
        this.unidades$ = this.unidadesService.index();
        this.paises$ = this.paisesService.index();
        this.graduacoes$ = this.graduacoesService.index();
        this.sexos$ = this.sexosService.index();
    }

    cadastrar(){
        delete this.form.value.pais;
        delete this.form.value.estado;
        delete this.form.value.unidade;
        delete this.form.value.subunidade;
       
        if(this.form.value.id){
            this.policiaisService.update(this.form.value.id, this.form.value).subscribe({
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
            this.policiaisService.create(this.form.value).subscribe({
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

    editar(data: Policial){
        this.form.patchValue(data);
      
        if(data.graduacao){
            this.form.get('graduacao')?.patchValue(data.graduacao.id);
        }
        if(data.sexo){
            this.form.get('sexo')?.patchValue(data.sexo.id);
        }
        if(data.setor){
            this.form.get('setor')?.patchValue(data.setor.id);
            this.form.get('subunidade')?.patchValue(data.setor.subunidade.id);
            this.form.get('unidade')?.patchValue(data.setor.subunidade.unidade.id);
            this.getSubunidades();
            this.getSetores();
        }
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

    getSubunidades(){
        this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
    }

    getSetores(){
        this.setores$ = this.setoresService.whereSubunidade(this.form.get('subunidade')?.value);
    }
   
}