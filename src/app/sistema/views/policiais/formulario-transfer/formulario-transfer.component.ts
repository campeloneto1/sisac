import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Policial } from "../policial";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

import { UnidadesService } from "../../unidades/unidades.service";
import { Unidades } from "../../unidades/unidade";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { SetoresService } from "../../setores/setores.service";
import { Subunidades } from "../../subunidades/subunidade";
import { Setores } from "../../setores/setor";
import { PoliciaisHistoricoService } from "../../policiais-historico/policiais-historico.service";
import { PolicialHistorico } from "../../policiais-historico/policial-historico";


@Component({
    selector: "app-formulario-transfer",
    templateUrl: './formulario-transfer.component.html',
    styleUrl: './formulario-transfer.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputSelectComponent
    ]
})
export class PoliciaisFormTransferComponent implements OnInit{
    
    protected form!: FormGroup;
    protected unidades$!: Observable<Unidades>;
    protected subunidades$!: Observable<Subunidades>;
    protected setores$!: Observable<Setores>;
    protected policial!: Policial;

    @Output('refresh') refresh: EventEmitter<Policial> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private policiaisHistoricoService:PoliciaisHistoricoService,
        private unidadesService:UnidadesService,
        private subunidadesService:SubunidadesService,
        private setoresService:SetoresService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'policial': [null],
            'unidade': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null, Validators.compose([
                Validators.required,
            ])],
            'setor': [null, Validators.compose([
                Validators.required,
            ])],
        });
        this.unidades$ = this.unidadesService.index();
    }

    cadastrar(){
        delete this.form.value.unidade;
        delete this.form.value.subunidade;
        if(this.form.value.id){
            this.policiaisHistoricoService.update(this.form.value.id, this.form.value).subscribe({
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

            let obj: PolicialHistorico = {
                policial: this.form.value.policial,
                setor_destino: this.form.value.setor,
                setor_origem: this.policial.setor
            }

            this.policiaisHistoricoService.create(obj).subscribe({
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
        this.policial = data;
        this.form.get('policial')?.patchValue(data.id);
        
        if(data.setor){
            this.form.get('setor')?.patchValue(data.setor.id);
            this.form.get('subunidade')?.patchValue(data.setor.subunidade.id);
            this.form.get('unidade')?.patchValue(data.setor.subunidade.unidade.id);
            this.getSubunidades();
            this.getSetores();
        }
    }

    getSubunidades(){
        this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
    }

    getSetores(){
        this.setores$ = this.setoresService.whereSubunidade(this.form.get('subunidade')?.value);
    }
   
}