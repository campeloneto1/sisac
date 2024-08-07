import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SessionService } from "../../../session.service";
import { Empresas } from "../../empresas/empresa";
import { Setores } from "../../setores/setor";
import { EmpresasService } from "../../empresas/empresas.service";
import { ContratosRelService } from "./contratos-rel.service";
import { Contrato, Contratos } from "../../contratos/contrato";
import { ContratosTipos } from "../../contratos-tipos/contrato-tipo";
import { ContratosTiposService } from "../../contratos-tipos/contratos-tipos.service";

@Component({
    selector: 'app-contratos-rel',
    templateUrl: './contratos-rel.component.html',
    styleUrl: './contratos-rel.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
      ]
})
export class ContratosRelComponent implements OnInit, OnDestroy{

    protected data$!: Observable<Contratos>;

    protected form!: FormGroup;
    protected empresas$!: Observable<Empresas>;
    protected setores$!: Observable<Setores>;
    protected contratostipos$!: Observable<ContratosTipos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private contratosRelService: ContratosRelService,
        private empresasService: EmpresasService,
        private contratosTiposService: ContratosTiposService,
       
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.form = this.formBuilder.group({
            'empresa': [null],
            'contrato_tipo': [null],
            'aditivado': [null],
            'prorrogado': [null],
            'subunidade': [null],
            'vigente': [null]
        });

        this.subscription2 = this.empresasService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                   
                    element.nome = `${element.nome}, ${element.cnpj}`;
                
                });
                this.empresas$ = of(data);
            }
        });
        //this.setores$ = this.setoresService.index();
        this.contratostipos$ = this.contratosTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    pesquisar(){
        if(this.sessionService.getSubunidade()){
            this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
        }
       this.data$ = this.contratosRelService.relatorio(this.form.value);
    }

    getSaldoDiarias(data:Contrato){
        if(data.quantidade_diarias){
          var result = data.quantidade_diarias - ((data.valor_usado*data.quantidade_diarias)/data.valor_global);
          return result.toFixed(2)
        }else{
          return null
        }
        
      }

      returnPercentUsado(data: Contrato){
        var percent = (data.valor_usado * 100)/data.valor_global;
        return percent.toFixed(2);
      }
    
      returnCorUsado(data: Contrato){
        var percent = (data.valor_usado * 100)/data.valor_global;
        var color = '';
        if(percent < 50){
          color = 'bg-success'
        }else if(percent < 70){
          color = 'bg-warning'
        }else{
          color = 'bg-danger'
        }
        return color;
      }
}