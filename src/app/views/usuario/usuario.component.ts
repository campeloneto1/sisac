import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;

  data$: any;

  constructor(private route: ActivatedRoute,
    private usuarios: UsuariosService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.usuarios.show(userid).subscribe(data => {
      this.data$ = data;
    });
  }

}
