import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { EscalasService } from '../../services/escalas.service';
import { EscalasModelosService } from '../../services/escalas-modelos.service';
import { EscalasDispensasService } from '../../services/escalas-dispensas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-escalas',
  templateUrl: './escalas.component.html',
  styleUrls: ['./escalas.component.css']
})
export class EscalasComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  user: any;

  dtOptions: any = {};

  dtHj = new Date();
  dtHj2 = new Date(this.dtHj.getFullYear(), this.dtHj.getMonth(), this.dtHj.getDate());

  data$: any;
  escalasmodelos$: any;
  usuarios$: any;

  excluir$: any;

  escala$: any;
  caddisp = false;
  disps = [];
  btndisp = true;

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Modelo Escala', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'outros', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  config2 = {
    displayFn:(item: any) => { return item.nome+' ('+item.matricula+')'; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Policial', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'outros', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Nenhum resultado encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Pesquisar', // label thats displayed in search input,
    searchOnKey: undefined ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }

  formcad = new FormGroup({
    id: new FormControl(''),
    data: new FormControl(''),  
    codigo: new FormControl(''),  
    escala_modelo_id: new FormControl(''), 
    escala_modelo: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private escalas: EscalasService,
    private escalasmodelos: EscalasModelosService,
    private escalasdispensas: EscalasDispensasService,
    private usuarios: UsuariosService) { 
     
        this.user = this.session.getUser();
        

    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      order: [0, 'desc'],
      //dom: 'Bfrtip',
      //buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    if(this.user.perfil.escalas){
      this.escalas.index().subscribe(data => {
        this.data$ = data;
        this.dtTrigger.next(this.dtOptions);
      }); 
    }else{
      this.router.navigate(['/Inicio']);
    }
    
    this.escalasmodelos.index().subscribe(data => {
      this.escalasmodelos$ = data;
    });

    this.usuarios.index2().subscribe(data => {
      this.usuarios$ = data;
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.escalas.index().subscribe(data => {
      this.data$ = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(this.dtOptions);
      });
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    //console.log(this.formcad.value);
    //@ts-ignore
    this.formcad.controls.escala_modelo_id.patchValue(this.formcad.value.escala_modelo.id);
    if(this.formcad.value.id){
      //@ts-ignore
      this.escalas.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.escalas.store(this.formcad.value).subscribe(data => {
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
    this.escalas.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  showDispensas(data:any){
    this.escala$ = data;
    this.disps = [];

    //console.log('chamou');
    //console.log(this.dtHj2);
    //console.log(data);
    var teste = data.data.split('-') ;
    var date = new Date(teste[0],teste[1]-1,teste[2]);
    //console.log(date);
    //console.log(this.dtHj2);
    if(this.dtHj2 <= date){
      this.btndisp = true;      
    }else{
      this.btndisp = false;   
    }
  }

  caddispe(){
    this.caddisp = true;
  }

  deletardisp(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.nome+"?");

    if(isExecuted){
      this.escalasdispensas.destroy(data.pivot.id).subscribe(data => {
        if(data == 1){
          this.refresh();   
          this.escalas.show(this.escala$.id).subscribe(data => {
            this.escala$ = data;
          });
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }    
  }

  cadastrardisp(){
    //console.log(this.usus);
    var teste = [];
    teste[0] = this.escala$.id;
    teste[1] = this.disps;
    this.escalasdispensas.store(teste).subscribe(data => {
      this.disps = [];
      this.caddisp = false;
      this.refresh();   
          this.escalas.show(this.escala$.id).subscribe(data => {
            this.escala$ = data;
          });
          this.toastr.success('Informação cadastrada com sucesso!');  
    });
    //console.log(teste);
  }

  comparadata(data:any){
    

  }
}
