import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';


import { CidadesService } from '../../services/cidades.service';
import { EstadosService } from '../../services/estados.service';
import { PaisesService } from '../../services/paises.service';
import { SubunidadesService } from '../../services/subunidades.service';
import { UnidadesService } from '../../services/unidades.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-subunidades',
  templateUrl: './subunidades.component.html',
  styleUrls: ['./subunidades.component.css']
})
export class SubunidadesComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;

  cidades$: any;
  estados$: any;
  paises$: any;
  unidades$: any;
  usuarios$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    
    unidade_id: new FormControl(''),  

    nome: new FormControl(''),  
    abreviatura: new FormControl(''),  
    email: new FormControl(''),  
    telefone1: new FormControl(''),  
    telefone2: new FormControl(''), 
    
    comandante_id: new FormControl(''),  
    subcomandante_id: new FormControl(''),  

    rua: new FormControl(''),  
    numero: new FormControl(''),  
    bairro: new FormControl(''),  
    complemento: new FormControl(''),  
    cep: new FormControl(''),  
    cidade_id: new FormControl(''),  
    estado_id: new FormControl(''),  
    pais_id: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private cidades: CidadesService,
    private estados: EstadosService,
    private paises: PaisesService,
    private subunidades: SubunidadesService,
    private unidades: UnidadesService,
    private usuarios: UsuariosService) {
      this.subunidades.index().subscribe(data => {
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
    
    this.paises.index().subscribe(data => {
      this.paises$ = data;      
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.subunidades.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  getEstados(){
    //@ts-ignore
    this.estados.where(this.formcad.value.pais_id).subscribe(data => {
      this.estados$ = data;
    });
  }

  getCidades(){
    //@ts-ignore
    this.cidades.where(this.formcad.value.estado_id).subscribe(data => {
      this.cidades$ = data;
    });
  }

  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.subunidades.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.subunidades.store(this.formcad.value).subscribe(data => {
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
    this.subunidades.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
