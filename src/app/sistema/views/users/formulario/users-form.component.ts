import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UsersService } from "../users.service";
import { User } from "../user";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";

import { PerfisService } from "../../perfis/perfis.service";
import { Perfis } from "../../perfis/perfil";
import { Unidades } from "../../unidades/unidade";
import { Subunidades } from "../../subunidades/subunidade";
import { UnidadesService } from "../../unidades/unidades.service";
import { SubunidadesService } from "../../subunidades/subunidades.service";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";

@Component({
    selector: "app-users-form",
    templateUrl: './users-form.component.html',
    styleUrl: './users-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class UsersFormComponent implements OnInit, OnDestroy{
    
    form!: FormGroup;

    protected perfis$!: Observable<Perfis>;
    protected unidades$!: Observable<Unidades>;
    protected policiais$!: Observable<Policiais>;
    protected subunidades$!: Observable<Subunidades>;

    private subscription: any;

    @Output('refresh') refresh: EventEmitter<User> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private perfisService: PerfisService,
        private unidadesService: UnidadesService,
        private policiaisService: PoliciaisService,
        private subunidadesService: SubunidadesService,
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
            'cpf': [null, Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'telefone': [null, Validators.compose([
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'email': [null, Validators.compose([
                Validators.maxLength(100),
                Validators.email
            ])],
            'perfil': [null, Validators.compose([
                Validators.required,
                
            ])],
            'unidade': [null, Validators.compose([
                Validators.required,
                
            ])],
            'subunidade': [null, Validators.compose([
                Validators.required,
                
            ])],
            'policial': [null, Validators.compose([
                Validators.required,
                
            ])],
        });

        this.perfis$ = this.perfisService.index();
        this.unidades$ = this.unidadesService.index();

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
        delete this.form.value.unidade;
        if(this.form.value.id){
            this.usersService.update(this.form.value.id, this.form.value).subscribe({
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
            this.usersService.create(this.form.value).subscribe({
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

    editar(data: User){
        this.form.patchValue(data);
        this.form.get('perfil')?.patchValue(data.perfil.id);

        if(data.policial){
            this.form.get('policial')?.patchValue(data.policial.id);
        }

        this.form.get('subunidade')?.patchValue(data.subunidade.id);
        this.form.get('unidade')?.patchValue(data.subunidade.unidade.id);
        this.getSubunidades();
    }

    getSubunidades(){
        this.subunidades$ = this.subunidadesService.whereUnidade(this.form.get('unidade')?.value);
    }
}