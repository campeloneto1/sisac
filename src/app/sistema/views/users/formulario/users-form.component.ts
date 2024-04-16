import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UsersService } from "../users.service";
import { User } from "../user";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable } from "rxjs";

import { PerfisService } from "../../perfis/perfis.service";
import { Perfis } from "../../perfis/perfil";

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
export class UsersFormComponent implements OnInit{
    
    form!: FormGroup;

    protected perfis$!: Observable<Perfis>;

    @Output('refresh') refresh: EventEmitter<User> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private perfisService: PerfisService,
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
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'perfil': [null, Validators.compose([
                Validators.required,
                
            ])],
        });

        this.perfis$ = this.perfisService.index();
    }

    cadastrar(){
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
    }

   
}