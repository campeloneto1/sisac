import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PoliciaisCursosService } from "../policiais-cursos.service";
import { PolicialCurso } from "../policial-curso";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Cursos } from "../../cursos/curso";
import { CursosService } from "../../cursos/cursos.service";

@Component({
    selector: "app-policiais-cursos-form",
    templateUrl: './policiais-cursos-form.component.html',
    styleUrl: './policiais-cursos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        InputTextareaComponent
    ]
})
export class PoliciaisCursosFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;
    protected cursos$!: Observable<Cursos>;

    private subscription!:any;

    @Output('refresh') refresh: EventEmitter<PolicialCurso> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private policiaisCursosService: PoliciaisCursosService,
        private policiaisService: PoliciaisService,
        private cursosService:CursosService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],
            'curso': [null, Validators.compose([
                Validators.required,
            ])],
            'data_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'data_final': [null],
            'boletim': [null],
            'carga_horaria': [null],
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

        this.cursos$ = this.cursosService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        if(this.form.value.id){
            this.policiaisCursosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.policiaisCursosService.create(this.form.value).subscribe({
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

    editar(data: PolicialCurso){
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
        this.form.get('curso')?.patchValue(data.curso.id);
    }

   
}