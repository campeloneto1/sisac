import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { SubunidadesService } from '../../services/subunidades.service';
import { AdministracaoService } from '../../services/administracao.service';


@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent implements OnInit, OnDestroy {
  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;

  excluir$: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '350',
    minHeight: '350',
    maxHeight: '350',
    width: 'auto',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Informe aqui o texto do documento...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    toolbarHiddenButtons : [
      [
        'insertImage',
        'insertVideo',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  
};

  formcad = new FormGroup({
    id: new FormControl(''),
    subunidade_id: new FormControl(''),  
    valor_irso_sd: new FormControl(''),  
    valor_irso_cb: new FormControl(''),  
    valor_irso_3sgt: new FormControl(''),  
    valor_irso_2sgt: new FormControl(''),  
    valor_irso_1sgt: new FormControl(''),  
    valor_irso_st: new FormControl(''),  
    valor_irso_2ten: new FormControl(''),  
    valor_irso_1ten: new FormControl(''),  
    valor_irso_cap: new FormControl(''),  
    valor_irso_maj: new FormControl(''),  
    valor_irso_tencel: new FormControl(''),  
    valor_irso_cel: new FormControl(''), 
    observacoes_escala: new FormControl(''), 

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,

    private administracao: AdministracaoService) {

        this.user = this.session.getUser();
        if(this.user.perfil.gestor){
          this.administracao.index().subscribe(data => {
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

    
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.administracao.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    if(this.formcad.value.id){
      //@ts-ignore
      this.administracao.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.administracao.store(this.formcad.value).subscribe(data => {
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
    this.administracao.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }


}
