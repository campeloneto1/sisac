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

  temppm: any;

  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;
  t: number = 1;
  u: number = 1;
  data$: any;

  constructor(private route: ActivatedRoute,
    private session: SessionService,
    private router: Router,
    private usuarios: UsuariosService) {

    this.user = this.session.getUser();
    if (this.user.perfil.gestor) {
      const routeParams = this.route.snapshot.paramMap;
      const userid = Number(routeParams.get('id'));

      this.usuarios.show(userid).subscribe(data => {
        this.data$ = data;

        if(this.data$.data_ingresso){
          this.temppm = this.diff_year_month_day();
        }
        
        //this.temppm = new Date().getTime() - new Date(this.data$.data_ingresso).getTime();
        //this.temppm = new Date(this.temppm)
      });
    } else {
      this.router.navigate(['/Inicio']);
    }

  }

  ngOnInit(): void {

  }

  diff_year_month_day() { 
    var date2 = new Date(this.data$.data_ingresso);
    var time = (new Date().getTime() - date2.getTime()) / 1000; 
    //var year = Math.abs(Math.round((time / (60 * 60 * 24)) / 365.25)); 
    //var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4))); 
    var days = Math.abs(Math.round(time / (3600 * 24))); 
    var anos = days / 365;
    var resto = days % 365;
    var meses = resto / 30;
    var dias = resto % 30;

    return Math.trunc(anos)+' anos, '+Math.trunc(meses)+' meses e '+dias+' dias';
  }
    //return 'Anos : ' + year + ' Meses : ' + month + ' Dias :' + days; }
}
