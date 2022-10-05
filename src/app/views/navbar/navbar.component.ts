import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { LoginService } from '../../services/login.service';
import { InicioService } from '../../services/inicio.service';
import { UsuariosService } from '../../services/usuarios.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any;
  url = environment.imagens;
  menu = false;
  menu2 = false;

  textsearch = '';

  formcadsenha = new FormGroup({
    id: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
  });

  constructor(private session: SessionService,
    private toastr: ToastrService,
    private router: Router,
    private inicio: InicioService,
    private usuarios: UsuariosService,
    private login: LoginService) { }

  ngOnInit(): void {
    this.user = this.session.getUser();
  }

  logout(){
    this.login.logout().subscribe(data => {
      //@ts-ignore
      if(data.codigo == 1){
        this.session.logout();
        this.router.navigate(['/']);
      }
    });
  }

  search(){
    this.inicio.search(this.textsearch).subscribe(data => {
      console.log(data);
    });
  }

  showmenu(){
    this.menu = !this.menu;
  }

  showmenu2(){
    this.menu2 = !this.menu2;
  }

  alterarsenha(){
    this.usuarios.changepass(this.formcadsenha.value).subscribe(data => {
      if(data == 1){
        this.toastr.success('Informação editada com sucesso!');  
        this.formcadsenha.reset();
      }
    })
  }

}
