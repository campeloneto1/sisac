import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

import { SessionService } from "../../../session.service";
import { DocumentosTipos } from "../../documentos-tipos/documento-tipo";
import { Documento } from "../documento";
import { DocumentosService } from "../documentos.service";
import { DocumentosTiposService } from "../../documentos-tipos/documentos-tipos.service";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";


@Component({
    selector: "app-documentos-form",
    templateUrl: './documentos-form.component.html',
    styleUrl: './documentos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent,
        InputTextareaComponent
    ]
})
export class DocumentosFormComponent implements OnInit{
    
    protected form!: FormGroup;
    protected documentostipos$!: Observable<DocumentosTipos>;
    protected selectedtipo: any;

    @Output('refresh') refresh: EventEmitter<Documento> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private documentosService:DocumentosService,
        private documentosTiposService:DocumentosTiposService,
        private toastr: ToastrService,
        private sessionService: SessionService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'titulo': [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(100)
            ])],
            'texto': [null, Validators.compose([
                Validators.required,
            ])],
            
            'codigo': [null],
            'documento_tipo': [null, Validators.compose([
                Validators.required,
            ])],
           'setor': [null],
        });
        //this.unidades$ = this.unidadesService.index();
        
        this.documentostipos$ = this.documentosTiposService.index();
       
    }

    cadastrar(){
      
        if(this.form.value.id){
            this.documentosService.update(this.form.value.id, this.form.value).subscribe({
                next: (data:any) => {
                    this.toastr.success('Edição realizada com sucesso!');
                    this.form.reset();
                    this.refresh.emit();
                },
                error: (error:any) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            });
        }else{
            if(this.sessionService.getSubunidade()){
                this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
            }else{
                this.toastr.error('Selecione uma subunidade!');
            }
            this.documentosService.create(this.form.value).subscribe({
                next: (data:any) => {
                    this.toastr.success('Cadastro realizado com sucesso!');
                    this.form.reset();
                    this.refresh.emit();
                },
                error: (error:any) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            });
        }
       
    }

    editar(data: Documento){
       
        this.form.patchValue(data);
        if(data.documento_tipo){
            this.form.get('documento_tipo')?.patchValue(data.documento_tipo.id);
        }
    }
}