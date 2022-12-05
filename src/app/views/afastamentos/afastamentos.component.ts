import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosAfastamentosService } from '../../services/usuarios-afastamentos.service';
import { AfastamentosTiposService } from '../../services/afastamentos-tipos.service';

@Component({
  selector: 'app-afastamentos',
  templateUrl: './afastamentos.component.html',
  styleUrls: ['./afastamentos.component.css']
})
export class AfastamentosComponent implements OnInit,OnDestroy {



  user: any;

  dtOptions: any = {};
  
  data$: any;
  usuarios$: any;
  afastamentostipos$: any;

  excluir$: any;

  config = {
    displayFn:(item: any) => { return item.nome+' ('+item.matricula+')'; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Policial', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }


  formcad = new FormGroup({
    id: new FormControl(''),
    afastamento_tipo_id: new FormControl(''),  
    user_id: new FormControl(''),  
    user: new FormControl(''),  
    data: new FormControl(''),  
    dias: new FormControl(''),  
    objeto_servico: new FormControl(false),  
    cid: new FormControl(''), 
    copem: new FormControl(''), 
    resultado: new FormControl(''), 
    //descricao: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private usuarios: UsuariosService,
    private usuariosafastamentos: UsuariosAfastamentosService,
    private afastamentostipos: AfastamentosTiposService) { 
      this.user = this.session.getUser();
        if(this.user.perfil.afastamentos){
          this.usuariosafastamentos.index().subscribe(data => {
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
      pageLength: 10,
      processing: true,
      responsive: true,
      order: [0, 'desc'],
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    this.usuarios.index2().subscribe(data => {
      next: this.usuarios$ = data;
    }); 

    this.afastamentostipos.index().subscribe(data => {
      next: this.afastamentostipos$ = data;
    });
    
  }

  ngOnDestroy(): void {
    
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.usuariosafastamentos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    //console.log(this.formcad.value);
    //@ts-ignore
    this.formcad.controls.user_id.patchValue(this.formcad.value.user.id)
    if(this.formcad.value.id){
      //@ts-ignore
      this.usuariosafastamentos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.usuariosafastamentos.store(this.formcad.value).subscribe(data => {
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
    this.usuariosafastamentos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }
}
