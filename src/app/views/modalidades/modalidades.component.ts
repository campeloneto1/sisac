import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ModalidadesService } from '../../services/modalidades.service';
import { ModalidadesPostosService } from '../../services/modalidades-postos.service';
import { PostosService } from '../../services/postos.service';

@Component({
  selector: 'app-modalidades',
  templateUrl: './modalidades.component.html',
  styleUrls: ['./modalidades.component.css']
})
export class ModalidadesComponent implements OnInit {

  p: number = 1;

  dtOptions: DataTables.Settings = {};

  data$: any;
  postos$: any;

  modalidade$: any;
  cadpost = false;
  posto = [];

  excluir$: any;

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Posto', // text to be displayed when no item is selected defaults to Select,
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
    uf: new FormControl(''),   

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private modalidades: ModalidadesService,
    private modalidadespostos: ModalidadesPostosService,
    private postos: PostosService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.modalidades.index().subscribe(data => {
      this.data$ = data;
      this.dtTrigger.next();
    }); 

    this.postos.index().subscribe(data => {
      this.postos$ = data;
    }); 
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.modalidades.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.modalidades.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.modalidades.store(this.formcad.value).subscribe(data => {
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
    this.modalidades.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  showPostos(data: any){
    this.modalidade$ = data;
  }

  cadpos(){
    this.cadpost = true;
    this.posto = [];
  }

  cadastrarposto(){
    var teste = [];
    teste[0] = this.modalidade$.id;
    teste[1] = this.posto;
    this.modalidadespostos.store(teste).subscribe(data => {
      if(data == 1){
        this.posto = [];
        this.cadpost = false;
        this.refresh();
        this.modalidades.show(this.modalidade$.id).subscribe(data2 => {
          this.modalidade$ = data2;
        })
        this.toastr.success('Informação cadastrada com sucesso!'); 
      }
    })
  }

  deletarposto(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.posto.nome+"?");

    if(isExecuted){
      this.modalidadespostos.destroy(data.id).subscribe(data => {
        if(data == 1){
          
          this.refresh();
          this.modalidades.show(this.modalidade$.id).subscribe(data2 => {
            this.modalidade$ = data2;
          })
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }
  }

}
