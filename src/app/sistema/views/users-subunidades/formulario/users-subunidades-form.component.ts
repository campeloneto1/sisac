import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UsersSubunidadesService } from "../users-subunidades.service";
import { UserSubunidade } from "../user-subunidade";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Subunidades } from "../../subunidades/subunidade";
import { Observable } from "rxjs";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { UnidadesService } from "../../unidades/unidades.service";
import { Unidades } from "../../unidades/unidade";

@Component({
    selector: "app-users-subunidades-form",
    templateUrl: './users-subunidades-form.component.html',
    styleUrl: './users-subunidades-form.component.css',
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
export class UsersSubunidadesFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected unidades$!: Observable<Unidades>;
    protected subunidades$!: Observable<Subunidades>;

    private subscription:any;

    @Input() user!: number;

    @Output('refresh') refresh: EventEmitter<UserSubunidade> = new EventEmitter();
    @Output('cancel') cancel: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private usersSubunidadesService: UsersSubunidadesService,
        private unidadesService: UnidadesService,
        private subunidadesService: SubunidadesService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'user': [null],
            'unidade': [null, Validators.compose([
                Validators.required,
            ])],
            'subunidade': [null, Validators.compose([
                Validators.required,
            ])],
        });

        this.unidades$ = this.unidadesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    cadastrar(){
        delete this.form.value.unidade;
        this.form.get('user')?.patchValue(this.user)
        if(this.form.value.id){
            this.usersSubunidadesService.update(this.form.value.id, this.form.value).subscribe({
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
            this.usersSubunidadesService.create(this.form.value).subscribe({
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

    editar(data: UserSubunidade){
        this.form.patchValue(data);
    }

    cancelar(){
        this.form.reset();
        this.cancel.emit();
    }

    getSubunidades(){
        this.subunidades$ = this.subunidadesService.whereUnidade(this.form.value.unidade);
    }
}