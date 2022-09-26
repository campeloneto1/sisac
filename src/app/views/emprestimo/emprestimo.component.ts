import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmprestimosService } from '../../services/emprestimos.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { SessionService } from '../../services/session.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {

  data$: any;

  user: any;
  subunidade: any;
  date = new Date();
  month = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  datahj = '';
  datadoc = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emprestimos: EmprestimosService,
    private session: SessionService,
    private subunidades: SubunidadesService,
    private apcom: AppComponent
  ) {
    
      this.apcom.token = false;
      this.user = this.session.getUser();
      if(this.user.perfil.emprestimos){
       
      }else{
        this.router.navigate(['/']);
      }
   
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.emprestimos.show(userid).subscribe((data) => {
      this.data$ = data;

      this.subunidades.show(this.data$.subunidade_id).subscribe(data => {
        this.subunidade = data;
      });
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    
    
    this.user = this.session.getUser();
      //console.log(this.user);
   
  }

}
