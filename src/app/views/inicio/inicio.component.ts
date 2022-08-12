import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router,
    private session: SessionService) { }

  ngOnInit(): void {
    if(this.session.check()){

    }else{
      this.router.navigate(['/']);
    }
  }

}
