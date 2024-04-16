import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { GraduacoesService } from "../graduacoes.service";
import { Graduacao } from "../graduacao";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-graduacoes-form",
    templateUrl: './graduacoes-form.component.html',
    styleUrl: './graduacoes-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class GraduacoesFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<Graduacao> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private graduacoesService: GraduacoesService,
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
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(5)
            ])],
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.graduacoesService.update(this.form.value.id, this.form.value).subscribe({
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
            this.graduacoesService.create(this.form.value).subscribe({
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

    editar(data: Graduacao){
        this.form.patchValue(data);
    }

   
}