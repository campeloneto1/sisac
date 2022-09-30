import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { PerfisService } from '../../services/perfis.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css']
})
export class PerfisComponent implements OnInit,OnDestroy {
  
  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),  

    administrador: new FormControl(''),  
    gestor: new FormControl(''),  
    oficial_dia: new FormControl(''),  
    permanente: new FormControl(''),  
    
    afastamentos: new FormControl(''),   
    afastamentos_cad: new FormControl(''),   
    afastamentos_edt: new FormControl(''),   
    afastamentos_del: new FormControl(''),   

    armamentos: new FormControl(''),   
    armamentos_cad: new FormControl(''),   
    armamentos_edt: new FormControl(''),   
    armamentos_del: new FormControl(''), 

    armamentos_emprestimos: new FormControl(''),   
    armamentos_emprestimos_cad: new FormControl(''),   
    armamentos_emprestimos_edt: new FormControl(''),   
    armamentos_emprestimos_del: new FormControl(''), 

    documentos: new FormControl(''),   
    documentos_cad: new FormControl(''),   
    documentos_edt: new FormControl(''),   
    documentos_del: new FormControl(''), 

    escalas: new FormControl(''),   
    escalas_cad: new FormControl(''),   
    escalas_edt: new FormControl(''),   
    escalas_del: new FormControl(''), 

    irsos: new FormControl(''),   
    irsos_cad: new FormControl(''),   
    irsos_edt: new FormControl(''),   
    irsos_del: new FormControl(''),
    
    materiais: new FormControl(''),   
    materiais_cad: new FormControl(''),   
    materiais_edt: new FormControl(''),   
    materiais_del: new FormControl(''), 

    materiais_emprestimos: new FormControl(''),   
    materiais_emprestimos_cad: new FormControl(''),   
    materiais_emprestimos_edt: new FormControl(''),   
    materiais_emprestimos_del: new FormControl(''), 

    publicacoes: new FormControl(''),   
    publicacoes_cad: new FormControl(''),   
    publicacoes_edt: new FormControl(''),   
    publicacoes_del: new FormControl(''), 

    ocorrencias: new FormControl(''),   
    ocorrencias_cad: new FormControl(''),   
    ocorrencias_edt: new FormControl(''),   
    ocorrencias_del: new FormControl(''), 

    usuarios: new FormControl(''),   
    usuarios_cad: new FormControl(''),   
    usuarios_edt: new FormControl(''),   
    usuarios_del: new FormControl(''), 

    veiculos: new FormControl(''),   
    veiculos_cad: new FormControl(''),   
    veiculos_edt: new FormControl(''),   
    veiculos_del: new FormControl(''), 

    veiculos_emprestimos: new FormControl(''),   
    veiculos_emprestimos_cad: new FormControl(''),   
    veiculos_emprestimos_edt: new FormControl(''),   
    veiculos_emprestimos_del: new FormControl(''),

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private perfis: PerfisService) {

        this.user = this.session.getUser();
        if(this.user.perfil.administrador){
          this.perfis.index().subscribe(data => {
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

    
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.perfis.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.perfis.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.perfis.store(this.formcad.value).subscribe(data => {
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
    this.perfis.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }


}
