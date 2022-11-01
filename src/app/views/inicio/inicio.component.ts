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

  escaladia: any;
  quantpm: any;
  quantafast: any;
  quantferias: any;
  quantaveiculos: any;
  quantasetores: any;
  materiaisemprestimos: any;
  veiculosemprestimos: any;
  trocaoleo: any;
  armamentosvencimentos: any;
  materiaisvencimentos: any;

  constructor(private session: SessionService,
    private inicio: InicioService) {
      
        this.user = this.session.getUser();
     
    }

  ngOnInit(): void {

    if(this.user.perfil.oficial_dia){
      this.inicio.getEscalaDia().subscribe((data) => {
        this.escaladia = data;
      });
    }

    if(this.user.perfil.usuarios){
      this.inicio.getQuantPms().subscribe((data) => {
        this.quantpm = data;
      });
  
    }
    
    if(this.user.perfil.afastamentos){
      this.inicio.getQuantAfast().subscribe((data) => {
        this.quantafast = data;
      });
  
    }

    if(this.user.perfil.usuarios_cad){
      this.inicio.getQuantFerias().subscribe((data) => {
        this.quantferias = data;
      });

      this.inicio.getSetores().subscribe((data) => {
        this.quantasetores = data;
      });
    }

    if(this.user.perfil.materiais){
      this.inicio.getMateriaisEmprestimos().subscribe((data) => {
        this.materiaisemprestimos = data;
      });

      this.inicio.getMatVencimentos().subscribe((data) => {
        this.materiaisvencimentos = data;
      });
    }

    if(this.user.perfil.veiculos){
        this.inicio.getTrocaOleo().subscribe((data) => {
        this.trocaoleo = data;
      });

      this.inicio.getQuantVeiculos().subscribe((data) => {
        this.quantaveiculos = data;
      });
    }
    
    if(this.user.perfil.veiculos_emprestimos){
      this.inicio.getVeiculosEmprestimos().subscribe((data) => {
        this.veiculosemprestimos = data;
      });
    }

    if(this.user.perfil.veiculos_emprestimos){
      this.inicio.getArmVencimentos().subscribe((data) => {
        this.armamentosvencimentos = data;
      });
    }
  }
}
