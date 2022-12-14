import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { DocumentosService } from '../../services/documentos.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { SessionService } from '../../services/session.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css'],
})
export class DocumentoComponent implements OnInit {
  data$: any;
  url = environment.imagens;
  qrcod = '';
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
    'outubro',
    'novembro',
    'dezembro',
  ];

  datahj = '';
  datadoc = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentos: DocumentosService,
    private session: SessionService,
    private subunidades: SubunidadesService,
    private apcom: AppComponent
  ) {
    
      //this.apcom.token = false;
      this.user = this.session.getUser();
      if(this.user.perfil.documentos){
       
      }else{
        this.router.navigate(['/']);
      }
   
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userid = Number(routeParams.get('id'));

    this.documentos.show(userid).subscribe((data) => {
      this.data$ = data;
      //@ts-ignore
      var date2 = new Date(data.created_at);
      //@ts-ignore
      //console.log(date2.getDate())
      //@ts-ignore
      this.datadoc = date2.getDate()+' de '+this.month[date2.getMonth()]+' de '+date2.getFullYear();

      this.subunidades.show(this.data$.subunidade_id).subscribe(data => {
        this.subunidade = data;
      });

      this.qrcod = environment.ipserver+'Validacao/1$'+this.data$.key;
    });
   
    this.datahj = this.date.getDate()+' de '+this.month[this.date.getMonth()]+' de '+this.date.getFullYear();

    
    
    this.user = this.session.getUser();
      //console.log(this.user);
   
  }
}
