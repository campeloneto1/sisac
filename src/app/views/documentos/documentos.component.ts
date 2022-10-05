import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

import { TiposDocumentosService } from '../../services/tipos-documentos.service';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit, OnDestroy {

  user: any;

  dtOptions: any = {};

  data$: any;
  tiposdocumentos$: any;

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
    documento_tipo_id: new FormControl(''),  
    titulo: new FormControl(''),  
    corpo: new FormControl(''),  
    codigo: new FormControl(''),  

  });

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService,
    private session: SessionService,
    private router: Router,
    private documentos: DocumentosService,
    private tiposdocumentos: TiposDocumentosService) {
      
      
        this.user = this.session.getUser();
        if(this.user.perfil.documentos){
          this.documentos.index().subscribe(data => {
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

    
    this.tiposdocumentos.index().subscribe(data => {
      this.tiposdocumentos$ = data;
    }); 
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.documentos.index().subscribe(data => {
      this.data$ = data;
    }); 
  }

  getCorpo(){
    var encontrou = false;
    var corpo = '';
    //console.log(this.formcad.value.documento_tipo_id)
    //console.log( this.tiposdocumentos$)
    for (let index = 0; index < this.tiposdocumentos$.length; index++) {
      if(this.formcad.value.documento_tipo_id == this.tiposdocumentos$[index].id && this.tiposdocumentos$[index].corpo){
        //console.log(`aaaaaa`)
        encontrou = true;
        corpo = this.tiposdocumentos$[index].corpo;
      }    
    }

    if(encontrou){
      this.formcad.controls.corpo.patchValue(corpo);
    }else{
      this.formcad.controls.corpo.patchValue(null);
    }
  }

  editar(data:any){   
    this.formcad.patchValue(data);    
  }

  salvar(){
    //console.log(this.formcad.value);
    //@ts-ignore
    if(this.formcad.value.id){
      //@ts-ignore
      this.documentos.update(this.formcad.value, this.formcad.value.id).subscribe(data => {
        if(data == 1){
          this.refresh();
          this.formcad.reset();
          this.toastr.success('Informação editada com sucesso!');  
        }
      });
    }else{
      this.documentos.store(this.formcad.value).subscribe(data => {
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
    this.documentos.destroy(this.excluir$.id).subscribe(data => {
      if(data == 1){
        this.refresh();    
        this.toastr.success('Informação excluída com sucesso!');  
      }
    })
  }


}
