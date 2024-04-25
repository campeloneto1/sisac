import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisFeriasService } from "../policiais-ferias.service";
import { PolicialFerias } from "../policial-ferias";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { format } from "date-fns";

@Component({
    selector: "app-policiais-ferias-form",
    templateUrl: './policiais-ferias-form.component.html',
    styleUrl: './policiais-ferias-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class PoliciaisFeriasFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;

    private subscription!:any;

    @Output('refresh') refresh: EventEmitter<PolicialFerias> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private policiaisFeriasService: PoliciaisFeriasService,
        private policiaisService: PoliciaisService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],
            'ano': [null , Validators.compose([
                Validators.required,
                Validators.min(2000)
            ])],
            'data_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'dias': [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            'data_final': [null],
            'boletim': [null, Validators.compose([
                Validators.maxLength(30),
                Validators.required,
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
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        this.form.get('data_final')?.patchValue(this.dataFinal(this.form.value.data_inicial, Number(this.form.value.dias)));
        if(this.form.value.id){
            this.policiaisFeriasService.update(this.form.value.id, this.form.value).subscribe({
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
            this.policiaisFeriasService.create(this.form.value).subscribe({
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

    editar(data: PolicialFerias){
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
    }

    dataFinal(data: Date, dias:number): string{
        let result:Date = new Date(data);
        result.setDate(result.getDate() + dias);
        return format(result, 'yyyy-MM-dd');
        
      }
   
}