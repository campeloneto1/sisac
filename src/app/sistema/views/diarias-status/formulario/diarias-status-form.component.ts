import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DiariasStatusService } from "../diarias-status.service";
import { DiariaStatus } from "../diaria-status";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-diarias-status-form",
    templateUrl: './diarias-status-form.component.html',
    styleUrl: './diarias-status-form.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule, 
        InputTextComponent,
    ]
})
export class DiariasStatusFormComponent implements OnInit{
    
    form!: FormGroup;

    @Output('refresh') refresh: EventEmitter<DiariaStatus> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private diarisStatusService: DiariasStatusService,
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
            'cadastrado': [null],
            'em_andamento': [null],
            'concluido': [null],
        });

    }

    cadastrar(){
        if(this.form.value.id){
            this.diarisStatusService.update(this.form.value.id, this.form.value).subscribe({
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
            this.diarisStatusService.create(this.form.value).subscribe({
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

    editar(data: DiariaStatus){
        this.form.patchValue(data);
    }

   
}