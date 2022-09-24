import { Component, OnInit } from '@angular/core';
import { InicioService } from '../../services/inicio.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  user: any;

  quantpm: any;
  quantafast: any;
  quantasetores: any;

  constructor(private session: SessionService,
    private inicio: InicioService) {
      setTimeout( () => {
        this.user = this.session.getUser();
      }, 1000);
    }

  ngOnInit(): void {
    this.inicio.getPm().subscribe((data) => {
      this.quantpm = data;
    });

    this.inicio.getAfast().subscribe((data) => {
      this.quantafast = data;
    });

    this.inicio.getSetores().subscribe((data) => {
      this.quantasetores = data;
    });
  }
}
