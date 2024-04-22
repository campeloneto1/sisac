import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ArmamentosCalibresService } from "../armamentos-calibres.service";
import { ArmamentoCalibre } from "../armamento-calibre";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-armamentos-calibres-form",
    templateUrl: './armamentos-calibres-form.component.html',
    styleUrl: './armamentos-calibres-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class ArmamentosCalibresFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<ArmamentoCalibre> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private armamentosCalibresService: ArmamentosCalibresService,
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
          
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.armamentosCalibresService.update(this.form.value.id, this.form.value).subscribe({
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
            this.armamentosCalibresService.create(this.form.value).subscribe({
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

    editar(data: ArmamentoCalibre){
        this.form.patchValue(data);
    }

   
}