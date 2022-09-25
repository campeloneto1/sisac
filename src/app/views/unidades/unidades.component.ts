import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { CidadesService } from '../../services/cidades.service';
import { EstadosService } from '../../services/estados.service';
import { PaisesService } from '../../services/paises.service';
import { UnidadesService } from '../../services/unidades.service';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit, OnDestroy {

  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;

  cidades$: any;
  estados$: any;
  paises$: any;
  usuarios$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
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
    private session: SessionService,
private router: Router,
    private cidades: CidadesService,
    private estados: EstadosService,
    private paises: PaisesService,
    private unidades: UnidadesService,
    private usuarios: UsuariosService) { 
     
        this.user = this.session.getUser();
        if(this.user.perfil.administrador){
          this.unidades.index().subscribe(data => {
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
    this.unidades.index().subscribe(data => {
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
      this.unidades.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.unidades.store(this.formcad.value).subscribe(data => {
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
    this.unidades.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
