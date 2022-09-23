import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ArmamentosService } from '../../services/armamentos.service';
import { ArmamentosTiposService } from '../../services/armamentos-tipos.service';
import { MarcasService } from '../../services/marcas.service';
import { ModelosService } from '../../services/modelos.service';

@Component({
  selector: 'app-armamentos',
  templateUrl: './armamentos.component.html',
  styleUrls: ['./armamentos.component.css']
})
export class ArmamentosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;
  marcas$: any;
  modelos$: any;
  armamentostipos$: any;

  excluir$: any;

  formcad = new FormGroup({
    id: new FormControl(''),
    serial: new FormControl(''), 
    armamento_tipo_id: new FormControl(''),  
    marca_id: new FormControl(''), 
    modelo_id: new FormControl(''), 

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private armamentos: ArmamentosService,
    private armamentostipos: ArmamentosTiposService,
    private marcas: MarcasService,
    private modelos: ModelosService) { 
      this.armamentos.index().subscribe(data => {
        this.data$ = data;
        this.dtTrigger.next();
      }); 

    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.marcas.index().subscribe(data => {
      this.marcas$ = data;
    });

    this.armamentostipos.index().subscribe(data => {
      this.armamentostipos$ = data;
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.armamentos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  where(){
    //@ts-ignore
    this.modelos.where(this.formcad.value.marca_id).subscribe(data => {
      this.modelos$ = data;
    });
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.armamentos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.armamentos.store(this.formcad.value).subscribe(data => {
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
    this.armamentos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
