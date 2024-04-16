import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PerfisService } from "../perfis.service";
import { Perfil } from "../perfil";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-perfis-form",
    templateUrl: './perfis-form.component.html',
    styleUrl: './perfis-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class PerfisFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<Perfil> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private perfisService: PerfisService,
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
            'administrador': [null],
            'gestor': [null],
            'relatorios': [null]
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.perfisService.update(this.form.value.id, this.form.value).subscribe({
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
            this.perfisService.create(this.form.value).subscribe({
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

    editar(data: Perfil){
        this.form.patchValue(data);
    }

   
}