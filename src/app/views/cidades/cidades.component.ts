import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CidadesService } from '../../services/cidades.service';
import { EstadosService } from '../../services/estados.service';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;
  estados$: any;
  paises$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    pais_id: new FormControl(''),  
    estado_id: new FormControl(''),  
    nome: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private cidades: CidadesService,
    private estados: EstadosService,
    private paises: PaisesService) {
      
    this.cidades.index().subscribe(data => {
      this.data$ = data;
      this.dtTrigger.next();
    }); 
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };


    this.paises.index().subscribe(data => {
      this.paises$ = data;
    }); 
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.cidades.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  getEstados(){
    //@ts-ignore
    this.estados.where(this.formcad.value.pais_id).subscribe(data => {
      this.estados$ = data;
    });
  }

  editar(data:any){   
    this.estados.where(data.estado.pais_id).subscribe(data => {
      this.estados$ = data;
    });
    this.formcad.patchValue(data);   
    this.formcad.controls.pais_id.patchValue(data.estado.pais_id);
    this.formcad.controls.estado_id.patchValue(data.estado_id);
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.cidades.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.cidades.store(this.formcad.value).subscribe(data => {
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
    this.cidades.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
