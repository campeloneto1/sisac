import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BancosService } from "../bancos.service";
import { Banco } from "../banco";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-bancos-form",
    templateUrl: './bancos-form.component.html',
    styleUrl: './bancos-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class BancosFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<Banco> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private bancosService: BancosService,
        private toastr: ToastrService,
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'nome': [null, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])],
          
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.bancosService.update(this.form.value.id, this.form.value).subscribe({
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
            this.bancosService.create(this.form.value).subscribe({
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

    editar(data: Banco){
        this.form.patchValue(data);
    }

   
}