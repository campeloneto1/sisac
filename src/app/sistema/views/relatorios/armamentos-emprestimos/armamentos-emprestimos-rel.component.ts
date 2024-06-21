import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleComponent } from "../../../components/title/title.component";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentosEmprestimosRelService } from "./armamentos-emprestimos-rel.service";
import { ArmamentosEmprestimos } from "../../armamentos-emprestimos/armamento-emprestimo";
import { Policiais } from "../../policiais/policial";
import { Armamentos } from "../../armamentos/armamento";
import { PoliciaisService } from "../../policiais/policiais.service";
import { ArmamentosService } from "../../armamentos/armamentos.service";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SessionService } from "../../../session.service";

@Component({
    selector: 'app-armamentos-emprestimos-rel',
    templateUrl: './armamentos-emprestimos-rel.component.html',
    styleUrl: './armamentos-emprestimos-rel.component.css',
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
export class ArmamentosEmprestimosRel implements OnInit, OnDestroy{

    protected data$!: Observable<ArmamentosEmprestimos>;

    protected form!: FormGroup;
    protected policiais$!: Observable<Policiais>;
    protected armamentos$!: Observable<Armamentos>;

    private subscription: any;
    private subscription2: any;

    constructor(
        private formBuilder: FormBuilder,
        private armamentosEmprestimosRelService: ArmamentosEmprestimosRelService,
        private policiaisService: PoliciaisService,
        private armamentosService: ArmamentosService,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.sessionService.checkPermission('relatorios');
        this.form = this.formBuilder.group({
            'armamento': [null],
            'policial': [null],
            'data_inicial': [null, Validators.compose([
                Validators.required
            ])],
            'data_final': [null, Validators.compose([
                Validators.required
            ])],
            'subunidade': [null],
        });

        this.subscription = this.policiaisService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.numeral){
                        element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
                    }else{
                        element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}`;
                    }
                    
                });
                this.policiais$ = of(data);
            }
        });

        this.subscription2 = this.armamentosService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.armamento_calibre){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, ${element.armamento_calibre?.nome}, Disp: ${element.quantidade_disponivel}`;
                    }else if(element.armamento_tamanho){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, ${element.armamento_tamanho?.nome}, Disp: ${element.quantidade_disponivel}`;
                    }else if(!element.armamento_tamanho && !element.armamento_calibre){
                        element.serial = `${element.armamento_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, Disp: ${element.quantidade_disponivel}`;
                    }
                });
                this.armamentos$ = of(data);
            }
        });
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
       this.data$ = this.armamentosEmprestimosRelService.relatorio(this.form.value);
    }
}