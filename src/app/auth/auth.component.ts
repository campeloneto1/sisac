import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../sistema/session.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { StorageService } from '../sistema/storage.service';
import { InputTextComponent } from '../sistema/components/input-text/input-text.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgxMaskDirective, 
    NgxMaskPipe,
    InputTextComponent
],
  providers: [
    AuthService, 
    SessionService, 
    StorageService,
    Router, 
    provideNgxMask(),
]
})
export class AuthComponent implements OnInit {

    form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private sessionService: SessionService,
        private storageService: StorageService,
        private router: Router,
        private toastr: ToastrService,
    ){}

    ngOnInit(){
        this.form = this.formBuilder.group({
            'cpf': ['', Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11)
            ])],
            'password': ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])],
            'lembrarme': ['']
        });

        
    }

    async entrar(){
       //console.log(this.form.value)
       if(this.form.value.lembrarme){
            localStorage.setItem('usuario', this.form.value.cpf);
        }

        this.authService.entrar(this.form.value).subscribe({
            next: (data:any) => {
                this.sessionService.setSession(data.user, data.access_token);
                this.storageService.setItem('user', JSON.stringify(data.user));
                this.storageService.setItem('token', data.access_token);
                
                if(this.storageService.getItem('url')){
                    this.router.navigate([this.storageService.getItem('url')]);
                }else{
                    this.router.navigate(['Inicio']);
                }
                
                
            },
            error: (error) => {
                this.toastr.error('Usuário ou senha incorreto!');
            }
        });
    }
}
