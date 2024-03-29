import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { EscalasModelosService } from '../../services/escalas-modelos.service';
import { EscalasModalidadesService } from '../../services/escalas-modalidades.service';
import { ModalidadesService } from '../../services/modalidades.service';

@Component({
  selector: 'app-escalas-modelos',
  templateUrl: './escalas-modelos.component.html',
  styleUrls: ['./escalas-modelos.component.css']
})
export class EscalasModelosComponent implements OnInit, OnDestroy {

  user: any;

  p: number = 1;

  dtOptions: any = {};

  data$: any;
  escala$: any;
  modalidades$: any;

  cadmodal = false;
  modalidade= [];

  excluir$: any;

  config = {
    displayFn:(item: any) => { return item.nome; } ,//to support flexible text displaying for each item
    displayKey:"nome", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '400px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Modalidade', // text to be displayed when no item is selected defaults to Select,
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
    administrativo: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private escalasmodelos: EscalasModelosService,
    private escalasmodalidades: EscalasModalidadesService,
    private modalidades: ModalidadesService) { 
        this.user = this.session.getUser();
        if(this.user.perfil.gestor){
          this.escalasmodelos.index().subscribe(data => {
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
      order: [1, 'asc'],
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    };

    
    this.modalidades.index().subscribe(data => {
      this.modalidades$ = data;
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.escalasmodelos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.escalasmodelos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.escalasmodelos.store(this.formcad.value).subscribe(data => {
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
    this.escalasmodelos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  showModalidade(data:any){
    this.escala$ = data;
  }

  cadmod(){
    this.cadmodal = true;
    this.modalidade = [];   
  }

  cadastrarmodalidade(){
    var teste = [];
    teste[0] = this.escala$.id;
    teste[1] = this.modalidade;
    this.escalasmodalidades.store(teste).subscribe(data => {
      if(data == 1){
        this.modalidade = [];
        this.cadmodal = false;
        this.refresh();
        this.escalasmodelos.show(this.escala$.id).subscribe(data2 => {
          this.escala$ = data2;
        })
        this.toastr.success('Informação cadastrada com sucesso!'); 
      }
    });
  }

  deletarmodal(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.nome+"?");

    if(isExecuted){
      this.escalasmodalidades.destroy(data.pivot.id).subscribe(data => {
        if(data == 1){
          
          this.refresh();
          this.escalasmodelos.show(this.escala$.id).subscribe(data2 => {
            this.escala$ = data2;
          })
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }
    
  }

}
