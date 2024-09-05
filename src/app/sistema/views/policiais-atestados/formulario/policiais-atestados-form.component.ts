import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisAtestadosService } from "../policiais-atestados.service";
import { PolicialAtestado } from "../policial-atestado";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { format } from "date-fns";
import { AfastamentosTipos } from "../../afastamentos-tipos/afastamento-tipo";
import { AfastamentosTiposService } from "../../afastamentos-tipos/afastamentos-tipos.service";

@Component({
    selector: "app-policiais-atestados-form",
    templateUrl: './policiais-atestados-form.component.html',
    styleUrl: './policiais-atestados-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class PoliciaisAtestadosFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;

    private subscription!:any;
    private subscription2!:any;

    protected afastamentoTipos$!: Observable<AfastamentosTipos>;
    protected isAtestado: boolean = false;

    @Output('refresh') refresh: EventEmitter<PolicialAtestado> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private policiaisAtestadosService: PoliciaisAtestadosService,
        private policiaisService: PoliciaisService,
        private afastamentosTiposService: AfastamentosTiposService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'afastamento_tipo': [null, Validators.compose([
                Validators.required,
            ])],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],
            'data_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'dias': [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            'data_final': [null],
            'cid': [null, Validators.compose([
                Validators.maxLength(20)
            ])],
            'hospital': [null, Validators.compose([
                Validators.maxLength(100)
            ])],
            'crm': [null, Validators.compose([
                Validators.maxLength(20)
            ])],
            
        });

        this.subscription = this.policiaisService.disponiveis().subscribe({
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

        this.afastamentoTipos$ = this.afastamentosTiposService.index();
    }

    ngOnDestroy(): void {
        
        if(this.subscription){
            this.subscription.unsubscribe();
        }

        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    cadastrar(){
        this.form.get('data_final')?.patchValue(this.dataFinal(this.form.value.data_inicial, Number(this.form.value.dias)));
        if(this.form.value.id){
            this.policiaisAtestadosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.policiaisAtestadosService.create(this.form.value).subscribe({
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

    editar(data: PolicialAtestado){
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
    }

    dataFinal(data: Date, dias:number): string{
        let result:Date = new Date(data);
        result.setDate(result.getDate() + dias);
        return format(result, 'yyyy-MM-dd');
      }
   
   tipoSelected(){
    this.subscription2 = this.afastamentoTipos$.subscribe({
        next: (data) => {
            data.forEach(value => {
                if(this.form.value.afastamento_tipo == value.id ){
                   this.isAtestado = value.atestado ? true : false;
                }
            })
        }
    })
   }
}