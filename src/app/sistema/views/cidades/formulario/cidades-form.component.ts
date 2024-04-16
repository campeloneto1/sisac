import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CidadesService } from "../cidades.service";
import { Cidade } from "../cidade";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable } from "rxjs";
import { Estados } from "../../estados/estado";
import { EstadosService } from "../../estados/estados.service";

@Component({
    selector: "app-cidades-form",
    templateUrl: './cidades-form.component.html',
    styleUrl: './cidades-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
        InputSelectComponent
    ]
})
export class CidadesFormComponent implements OnInit{
    
    form!: FormGroup;

    protected estados$!: Observable<Estados>;

    @Output('refresh') refresh: EventEmitter<Cidade> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private cidadesService: CidadesService,
        private estadosService: EstadosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)
            ])],
            'abreviatura': [null, Validators.compose([
                
                Validators.minLength(2),
                Validators.maxLength(5)
            ])],
            'estado': [null, Validators.compose([
                Validators.required,
                
            ])],
        });

        this.estados$ = this.estadosService.index();
    }

    cadastrar(){
        if(this.form.value.id){
            this.cidadesService.update(this.form.value.id, this.form.value).subscribe({
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
            this.cidadesService.create(this.form.value).subscribe({
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

    editar(data: Cidade){
        this.form.patchValue(data);
        this.form.get('estado')?.patchValue(data.estado.id);
    }

   
}