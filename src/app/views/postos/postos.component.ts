import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { PostosService } from '../../services/postos.service';
import { PostosTurnosService } from '../../services/postos-turnos.service';
import { TurnosService } from '../../services/turnos.service';

@Component({
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css']
})
export class PostosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;
  turnos$: any;
  posto$: any;
  turno = [];

  cadtur = false;

  excluir$: any;

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Turno', // text to be displayed when no item is selected defaults to Select,
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
    nome: new FormControl(''),  
    abreviatura: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private postos: PostosService,
    private turnos: TurnosService,
    private postosturnos: PostosTurnosService) { 
      this.postos.index().subscribe(data => {
        this.data$ = data;
        this.dtTrigger.next();
      }); 
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

   

    this.turnos.index().subscribe(data => {
      this.turnos$ = data;
    }); 
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.postos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.postos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.postos.store(this.formcad.value).subscribe(data => {
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
    this.postos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  showTurnos(data:any){
    this.posto$ = data;
  }

  cadturno(){
    this.turno = [];
    this.cadtur = true;
  }

  cadastrarturno(){
    var teste = [];
    teste[0] = this.posto$.id;
    teste[1] = this.turno;
    this.postosturnos.store(teste).subscribe(data => {
      if(data == 1){
        this.turno = [];
        this.cadtur = false;
        this.refresh();
        this.postos.show(this.posto$.id).subscribe(data2 => {
          this.posto$ = data2;
        })
        this.toastr.success('Informação cadastrada com sucesso!'); 
      }
    });
  }

  deletartur(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.turno.nome+"?");

    if(isExecuted){
      this.postosturnos.destroy(data.id).subscribe(data => {
        if(data == 1){
          
          this.refresh();
          this.postos.show(this.posto$.id).subscribe(data2 => {
            this.posto$ = data2;
          })
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }
    
  }

}
