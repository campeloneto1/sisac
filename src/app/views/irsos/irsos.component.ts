import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { IrsosService } from '../../services/irsos.service';
import { IrsosUsersService } from '../../services/irsos-users.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-irsos',
  templateUrl: './irsos.component.html',
  styleUrls: ['./irsos.component.css']
})
export class IrsosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  data$: any;
  usuarios$: any;

  irso$: any;
  cadus = false;
  usus = [];

  excluir$: any;

  config = {
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
    subunidade_id: new FormControl(''),  
    nome: new FormControl(''),  
    data: new FormControl(''),  
    hora: new FormControl(''),      
    //descricao: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private irsos: IrsosService,
    private irsosusers: IrsosUsersService,
    private usuarios: UsuariosService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.irsos.index().subscribe(data => {
      this.data$ = data;
      this.dtTrigger.next();
    }); 


    this.usuarios.index().subscribe(data => {
      this.usuarios$ = data;
    }); 
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.irsos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  showUsuarios(data:any){
    this.irso$ = data;
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    //console.log(this.formcad.value);
    //@ts-ignore
    if(this.formcad.value.id){
      //@ts-ignore
      this.irsos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.irsos.store(this.formcad.value).subscribe(data => {
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
    this.irsos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

  cadusu(){
    this.cadus = true;
  }

  deletarusu(data:any){
    let isExecuted = confirm("Tem certeza que deseja excluir "+data.user.nome+"?");

    if(isExecuted){
      this.irsosusers.destroy(data.id).subscribe(data => {
        if(data == 1){
          this.refresh();   
          this.irsos.show(this.irso$.id).subscribe(data => {
            this.irso$ = data;
          });
          this.toastr.success('Informação excluída com sucesso!');  
        }
      });
    }    
  }

  cadastrarusu(){
    //console.log(this.usus);
    var teste = [];
    teste[0] = this.irso$.id;
    teste[1] = this.usus;
    this.irsosusers.store(teste).subscribe(data => {
      this.usus = [];
      this.cadus = false;
      this.refresh();   
          this.irsos.show(this.irso$.id).subscribe(data => {
            this.irso$ = data;
          });
          this.toastr.success('Informação cadastrada com sucesso!');  
    });
    //console.log(teste);
  }

}
