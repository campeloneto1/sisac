import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: any;

  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;
  t: number = 1;

  data$: any;

  constructor(private route: ActivatedRoute,
    private session: SessionService,
    private router: Router,
    private usuarios: UsuariosService) {
      
        this.user = this.session.getUser();
        if(this.user.perfil.gestor){
          const routeParams = this.route.snapshot.paramMap;
          const userid = Number(routeParams.get('id'));

          this.usuarios.show(userid).subscribe(data => {
            this.data$ = data;
          });
        }else{
          this.router.navigate(['/Inicio']);
        }
     
     }

  ngOnInit(): void {
    
  }

}
