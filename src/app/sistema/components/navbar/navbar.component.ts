import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { SessionService } from "../../session.service";
import { StorageService } from "../../storage.service";
import { Router, RouterModule } from "@angular/router";
import { InputTextComponent } from "../input-text/input-text.component";
import { UsersService } from "../../views/users/users.service";
import { ToastrService } from "ngx-toastr";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { User } from "../../views/users/user";
import { Observable, of } from "rxjs";
import { Subunidades } from "../../views/subunidades/subunidade";
import { InputSelectComponent } from "../input-select/input-select.component";
import { NgxSelectModule } from "ngx-select-ex";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        RouterModule,
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        Router,
        provideNgxMask(),
    ]
})

export class NavbarComponent implements OnInit{

    protected user!: User;
    protected subunidades$!: Observable<Subunidades>;
    protected subunidade!: number;
    protected form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private storageService: StorageService,
        private usersService: UsersService,
        private router: Router,
        private toastr: ToastrService,
    ){}

    async ngOnInit() {
        this.user = this.sessionService.getUser();
        
        if(!this.user){
            this.user = JSON.parse(await this.storageService.getItem('user')!);
        }
        if(this.user){
            if(this.storageService.getItem('subunidade')){
                this.subunidade = Number(this.storageService.getItem('subunidade'));
            }else{
                 //@ts-ignore
                this.subunidade = this.user.users_subunidades[0].subunidade.id;
                this.setSubunidade();
            }
           
            var subunidadesuser:Subunidades = [];
            this.user.users_subunidades?.forEach((data) =>{
                subunidadesuser.push(data.subunidade);
            })
            
            this.subunidades$ = of(subunidadesuser);
        }
        this.form = this.formBuilder.group({
            'id': [null],
            'password': [null, Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(100)
            ])],
            'confirm': [null, Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(100)
            ])],
        });

    }

    setSubunidade(){
        //@ts-ignore
        this.storageService.setItem('subunidade', this.subunidade);
    }

    logout(){
        this.sessionService.logout();
        this.router.navigate(['auth']);
    }

    alterarSenha(){
        var data: any = {
            id: this.user.id,
            password: this.form.value.password
        }
        this.usersService.change(data).subscribe({
            next: (data:any) => {
                this.toastr.success('Cadastro realizado com sucesso!');
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        });
    }
}