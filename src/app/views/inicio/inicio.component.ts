import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioService } from '../../services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  quantpm: any;
  quantafast: any;

  constructor(private inicio: InicioService) {}

  ngOnInit(): void {
    this.inicio.getPm().subscribe((data) => {
      this.quantpm = data;
    });

    this.inicio.getAfast().subscribe((data) => {
      this.quantafast = data;
    });
  }
}
