import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { ToastrService } from "ngx-toastr";
import { MaterialPolicial } from "../material-policial";
import { MateriaisPoliciaisService } from "../materiais-policiais.service";

@Component({
    selector: 'app-materiais-policiais-form-receber',
    templateUrl: './materiais-policiais-form-receber.component.html',
    styleUrl: './materiais-policiais-form-receber.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextareaComponent
    ]
})
export class MateriaisPoliciaisFormReceberComponent implements OnInit{


    protected form!: FormGroup;

    @Input() materialPolicial!: MaterialPolicial;

    @Output('refresh') refresh: EventEmitter<MaterialPolicial> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private materiaisPoliciaisService: MateriaisPoliciaisService,
        private toastr: ToastrService,
    ){}
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [null],
            'observacoes': [this.materialPolicial.observacoes],  
            'materiais': [null],                  
        });
    }

    cadastrar(){
        var mats:any = [];
        const formElements = document.querySelectorAll('#formdev input')
        Array.from(formElements).forEach((element) => {
            if(element.id){
                mats.push(
                    {
                        id: element.id,
                        //@ts-ignore
                       quantidade: parseInt(element.value)
                    }
                )
            }

        });
        this.form.get('materiais')?.patchValue(mats)
        this.form.get('id')?.patchValue(this.materialPolicial.id)

        this.materiaisPoliciaisService.receber(this.form.value).subscribe({
            next: (data) => {
                this.toastr.success('Edição realizada com sucesso!');
                this.form.reset();
                this.refresh.emit();
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        })
    }
}