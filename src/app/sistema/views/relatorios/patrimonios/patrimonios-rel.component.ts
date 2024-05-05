import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PatrimoniosRelService } from "./patrimonios-rel.service";
import { Setores } from "../../setores/setor";
import { PatrimoniosTipos } from "../../patrimonios-tipos/patrimonio-tipo";
import { SetoresService } from "../../setores/setores.service";
import { PatrimoniosTiposService } from "../../patrimonios-tipos/patrimonios-tipos.service";
import { Patrimonios } from "../../patrimonios/patrimonio";

@Component({
    selector: 'app-patrimonios-rel',
    templateUrl: './patrimonios-rel.component.html',
    styleUrl: './patrimonios-rel.component.css',
    standalone: true,
    imports: [
        CommonModule,
        TitleComponent,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
    ]
})
export class PatrimoniosRel implements OnInit, OnDestroy{

    protected data$!: Observable<Patrimonios>;

    protected form!: FormGroup;
    protected setores$!: Observable<Setores>;
    protected patrimoniostipos$!: Observable<PatrimoniosTipos>;

    private subscription: any;

    constructor(
        private formBuilder: FormBuilder,
        private setoresService: SetoresService,
        private patrimoniosTiposService: PatrimoniosTiposService,
        private patrimoniosRelService: PatrimoniosRelService
    ){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'setor': [null],
            'patrimonio_tipo': [null],
            'data_baixa': [null],
            
        });

        this.setores$ = this.setoresService.index();
        
        this.patrimoniostipos$ = this.patrimoniosTiposService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

   

    pesquisar(){
       this.data$ = this.patrimoniosRelService.relatorio(this.form.value);
    }
}