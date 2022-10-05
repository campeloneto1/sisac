import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { SubunidadesService } from '../../services/subunidades.service';
import { AdministracaoService } from '../../services/administracao.service';
import { IrsosFinanceirosService } from '../../services/irsos-financeiros.service';


@Component({
  selector: 'app-irsos-financeiros',
  templateUrl: './irsos-financeiros.component.html',
  styleUrls: ['./irsos-financeiros.component.css']
})
export class IrsosFinanceirosComponent implements OnInit {

  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;
  administracao$: any;
  gastomensal$: any;
  cotamensal$: any;
  excluir$: any;

  totalgeral = 0;

  formcad = new FormGroup({
    id: new FormControl(''),
    subunidade_id: new FormControl(''),  
    data: new FormControl(''),  
    cota_mensal: new FormControl(''),  
    valor_irso_sd: new FormControl(''),  
    valor_irso_cb: new FormControl(''),  
    valor_irso_3sgt: new FormControl(''),  
    valor_irso_2sgt: new FormControl(''),  
    valor_irso_1sgt: new FormControl(''),  
    valor_irso_st: new FormControl(''),  
    valor_irso_2ten: new FormControl(''),  
    valor_irso_1ten: new FormControl(''),  
    valor_irso_cap: new FormControl(''),  
    valor_irso_maj: new FormControl(''),  
    valor_irso_tencel: new FormControl(''),  
    valor_irso_cel: new FormControl(''),   

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private administracao: AdministracaoService,
    private irsosfinanceiros: IrsosFinanceirosService) {

        this.user = this.session.getUser();
        if(this.user.perfil.gestor){
          this.irsosfinanceiros.index().subscribe(data => {
            this.data$ = data;
            this.dtTrigger.next();
          }); 
        }else{
          this.router.navigate(['/Inicio']);
        }

      
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.administracao.index().subscribe(data => {
      this.administracao$ = data;
    }); 
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.irsosfinanceiros.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  showCad(){
    this.formcad.reset()
    this.formcad.patchValue(this.administracao$[0]);
    this.formcad.controls.id.patchValue(null);
    this.formcad.controls.subunidade_id.patchValue(null);
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
    this.formcad.controls.data.patchValue(data.data.substr(0,7));
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.irsosfinanceiros.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.irsosfinanceiros.store(this.formcad.value).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação cadastrada com sucesso!');  
        }
      });
    }
  }

  deletar(data:any){
    this.excluir$ = data;
  }

  confirm(){
    this.irsosfinanceiros.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  showGasto(data:any){
    this.cotamensal$ = data;
    this.totalgeral = 0;
    this.irsosfinanceiros.gastomensal(data.data).subscribe(data => {
      //console.log(data);
      this.gastomensal$ = data;

      for (let index = 0; index <  this.gastomensal$.length; index++) {
        this.gastomensal$[index].total = this.gastomensal$[index].SD + this.gastomensal$[index].CB + 
        this.gastomensal$[index].SGT3 + this.gastomensal$[index].SGT2 + this.gastomensal$[index].SGT1 + 
        this.gastomensal$[index].ST + this.gastomensal$[index].TEN2 + this.gastomensal$[index].TEN1 + 
        this.gastomensal$[index].CAP + this.gastomensal$[index].MAJ + this.gastomensal$[index].TENCEL + this.gastomensal$[index].CEL;
        this.totalgeral =  this.totalgeral + this.gastomensal$[index].total;
      }
    });
  }


}
