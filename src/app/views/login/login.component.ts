import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../services/login.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formcad = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private session: SessionService,
    private login: LoginService,
    private appcom: AppComponent
  ) {
    localStorage.clear();
    this.appcom.token = false;
    if (localStorage.getItem('token')) {
      this.session.logout();
    }
  }

  ngOnInit(): void {}

  makeid(length:any) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  entrar() {
    //console.warn(this.formcad.value)
    //@ts-ignore
    var string = this.makeid(6);
    var string2 = this.makeid(6);    
    var string3 = this.makeid(6);
    var string4 = this.makeid(6);    

    var obj = {
      usuario: string+btoa(string+this.formcad.value.usuario)+string3,
      password: string2+btoa(string+this.formcad.value.password)+string4
    }

    this.login.login(obj).subscribe(
      (data) => {
        //console.log(data);
        //@ts-ignore
        if (data.token) {
          //console.log('data');
          //@ts-ignore
          this.session.setSession(data);
          this.appcom.token = true;
          this.appcom.logado = true;
          this.router.navigate(['/Inicio']);
        }
      },
      (err) => {
        //console.log(err)
        if (err.error.cod == 171) {
          this.toastr.error('Usuário ou senha inválido!', 'Erro');
        }
        if (err.status == 429) {
          this.toastr.warning('Muitas tentativas realizadas, espere 1 minuto para tentar novamente!', 'Muitas tentativas');
        }
      }
    );
  }
}
