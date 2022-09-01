import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { SubunidadesService } from '../../services/subunidades.service';
import { SetoresService } from '../../services/setores.service';
import { UnidadesService } from '../../services/unidades.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.css']
})
export class SetoresComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;

  unidades$: any;
  subunidades$: any;
  usuarios$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    
    unidade_id: new FormControl(''),  
    subunidade_id: new FormControl(''),  

    nome: new FormControl(''),  
    abreviatura: new FormControl(''),  
    email: new FormControl(''),  
    telefone1: new FormControl(''),  
    telefone2: new FormControl(''), 
    
    comandante_id: new FormControl(''),  
    subcomandante_id: new FormControl(''),  
    escala: new FormControl(''),
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private unidades: UnidadesService,
    private subunidades: SubunidadesService,
    private setores: SetoresService,
    private usuarios: UsuariosService) { 
      this.setores.index().subscribe(data => {
        this.data$ = data;
        this.dtTrigger.next();
      }); 
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    

    this.unidades.index().subscribe(data => {
      this.unidades$ = data;
    });

    this.usuarios.index().subscribe(data => {
      this.usuarios$ = data;
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.setores.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  getSubunidades(){
    //@ts-ignore
    this.subunidades.where(this.formcad.value.unidade_id).subscribe(data => {
      this.subunidades$ = data;
    });
  }

  editar(data:any){   
    //@ts-ignore
    this.subunidades.where(data.subunidade.unidade_id).subscribe(data => {
      this.subunidades$ = data;
    });
    this.formcad.patchValue(data);    
    this.formcad.controls.unidade_id.patchValue(data.subunidade.unidade_id);
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.setores.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.setores.store(this.formcad.value).subscribe(data => {
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
    this.setores.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
