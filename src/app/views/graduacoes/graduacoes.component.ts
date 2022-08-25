import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { GraduacoesService } from '../../services/graduacoes.service';

@Component({
  selector: 'app-graduacoes',
  templateUrl: './graduacoes.component.html',
  styleUrls: ['./graduacoes.component.css']
})
export class GraduacoesComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;

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
    private graduacoes: GraduacoesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.graduacoes.index().subscribe(data => {
      this.data$ = data;
      this.dtTrigger.next();
    }); 
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.graduacoes.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.graduacoes.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.graduacoes.store(this.formcad.value).subscribe(data => {
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
    this.graduacoes.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
