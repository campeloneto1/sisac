import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { TiposOcorrenciasService } from '../../services/tipos-ocorrencias.service';
import { OcorrenciasService } from '../../services/ocorrencias.service';
import { EscalasService } from '../../services/escalas.service';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.component.html',
  styleUrls: ['./ocorrencias.component.css']
})
export class OcorrenciasComponent implements OnInit,OnDestroy {

  user: any;

  dtOptions: DataTables.Settings = {};

  data$: any;
  tiposocorrencias$: any;
  escalas$: any;

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
    escala_id: new FormControl(''),  
    ocorrencia_id: new FormControl(''),  
    titulo: new FormControl(''),  
    codigo: new FormControl(''),  
    descricao: new FormControl(''),  
  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private escalas: EscalasService,
    private ocorrencias: OcorrenciasService,
    private tiposocorrencias: TiposOcorrenciasService) {
      setTimeout( () => {
        this.user = this.session.getUser();
        if(this.user.perfil.oficial_dia){
          this.ocorrencias.index().subscribe(data => {
            this.data$ = data;
            this.dtTrigger.next();
          }); 
        }else{
          this.router.navigate(['/Inicio']);
        }
      }, 1000);
      
  
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    
    this.tiposocorrencias.index().subscribe(data => {
      this.tiposocorrencias$ = data;
    }); 

    this.escalas.index().subscribe(data => {
      this.escalas$ = data;
    }); 
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.ocorrencias.index().subscribe(data => {
      this.data$ = data;
    }); 
  }


  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    //console.log(this.formcad.value);
    //@ts-ignore
    if(this.formcad.value.id){
      //@ts-ignore
      this.ocorrencias.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.ocorrencias.store(this.formcad.value).subscribe(data => {
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
    this.ocorrencias.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }

}
