import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { LoginService } from '../../services/login.service';
import { InicioService } from '../../services/inicio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any;

  textsearch = '';

  constructor(private session: SessionService,
    private router: Router,
    private inicio: InicioService,
    private login: LoginService) { }

  ngOnInit(): void {

    setTimeout( () => {
      this.user = this.session.getUser();
      //console.log(this.user);
    }, 1000);

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

}
