import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { TiposPublicacoesService } from '../../services/tipos-publicacoes.service';

@Component({
  selector: 'app-tipos-publicacoes',
  templateUrl: './tipos-publicacoes.component.html',
  styleUrls: ['./tipos-publicacoes.component.css']
})
export class TiposPublicacoesComponent implements OnInit, OnDestroy {
  
  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;
  publicacoes$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
private router: Router,
    private tipopublicacoes: TiposPublicacoesService) { 
      setTimeout( () => {
        this.user = this.session.getUser();
        if(this.user.perfil.administrador){
          this.tipopublicacoes.index().subscribe(data => {
            this.data$ = data;
            this.dtTrigger.next();
          }); 
        }else{
          this.router.navigate(['/Inicio']);
        }
      }, 1000);
      
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
    this.tipopublicacoes.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.tipopublicacoes.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.tipopublicacoes.store(this.formcad.value).subscribe(data => {
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
    this.tipopublicacoes.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
