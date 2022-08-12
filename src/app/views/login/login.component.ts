import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../services/login.service';
import { SessionService } from '../..//services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formcad = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private toastr: ToastrService,
    private router: Router,
    private session: SessionService,
    private login: LoginService) { }

  ngOnInit(): void {
    
  }

  entrar(){
    
    //console.warn(this.formcad.value)
    this.login.login(this.formcad.value).subscribe(
      data => {
        //console.log(data);
        //@ts-ignore
        if(data.token){
          //@ts-ignore
          this.session.setSession(data);
          this.router.navigate(['/Inicio']);
        }
      },
      err => {
        //console.log(err)
       if(err.error.cod == 171){
        this.toastr.error('Usuário ou senha inválido!', 'Erro');    
       }   
      }
    );
  }

}
