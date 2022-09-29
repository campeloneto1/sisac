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
  quantaveiculos: any;
  quantasetores: any;
  materiaisemprestimos: any;
  veiculosemprestimos: any;
  trocaoleo: any;
  vencimentos: any;

  constructor(private session: SessionService,
    private inicio: InicioService) {
      
        this.user = this.session.getUser();
     
    }

  ngOnInit(): void {
    this.inicio.getQuantPms().subscribe((data) => {
      this.quantpm = data;
    });

    this.inicio.getQuantAfast().subscribe((data) => {
      this.quantafast = data;
    });

    this.inicio.getQuantVeiculos().subscribe((data) => {
      this.quantaveiculos = data;
    });

    this.inicio.getSetores().subscribe((data) => {
      this.quantasetores = data;
    });

    this.inicio.getMateriaisEmprestimos().subscribe((data) => {
      this.materiaisemprestimos = data;
    });

    this.inicio.getVeiculosEmprestimos().subscribe((data) => {
      this.veiculosemprestimos = data;
    });

    this.inicio.getTrocaOleo().subscribe((data) => {
      this.trocaoleo = data;
    });

    this.inicio.getVencimentos().subscribe((data) => {
      this.vencimentos = data;
    });
  }
}
