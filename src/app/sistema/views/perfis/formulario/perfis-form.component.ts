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
            'relatorios': [null],

            'armamentos': [null],
            'armamentos_cad': [null],
            'armamentos_edt': [null],
            'armamentos_del': [null],

            'armamentos_emprestimos': [null],
            'armamentos_emprestimos_cad': [null],
            'armamentos_emprestimos_edt': [null],
            'armamentos_emprestimos_del': [null],

            'materiais': [null],
            'materiais_cad': [null],
            'materiais_edt': [null],
            'materiais_del': [null],

            'materiais_policiais': [null],
            'materiais_policiais_cad': [null],
            'materiais_policiais_edt': [null],
            'materiais_policiais_del': [null],

            'materiais_consumo': [null],
            'materiais_consumo_cad': [null],
            'materiais_consumo_edt': [null],
            'materiais_consumo_del': [null],

            'materiais_consumo_entradas': [null],
            'materiais_consumo_entradas_cad': [null],
            'materiais_consumo_entradas_edt': [null],
            'materiais_consumo_entradas_del': [null],

            'materiais_consumo_saidas': [null],
            'materiais_consumo_saidas_cad': [null],
            'materiais_consumo_saidas_edt': [null],
            'materiais_consumo_saidas_del': [null],


            'patrimonios': [null],
            'patrimonios_cad': [null],
            'patrimonios_edt': [null],
            'patrimonios_del': [null],

            'policiais': [null],
            'policiais_cad': [null],
            'policiais_edt': [null],
            'policiais_del': [null],

            'policiais_atestados': [null],
            'policiais_atestados_cad': [null],
            'policiais_atestados_edt': [null],
            'policiais_atestados_del': [null],

            'policiais_cursos': [null],
            'policiais_cursos_cad': [null],
            'policiais_cursos_edt': [null],
            'policiais_cursos_del': [null],

            'policiais_ferias': [null],
            'policiais_ferias_cad': [null],
            'policiais_ferias_edt': [null],
            'policiais_ferias_del': [null],

            'policiais_publicacoes': [null],
            'policiais_publicacoes_cad': [null],
            'policiais_publicacoes_edt': [null],
            'policiais_publicacoes_del': [null],

            'policiais_requeridas': [null],
            'policiais_requeridas_cad': [null],
            'policiais_requeridas_edt': [null],
            'policiais_requeridas_del': [null],

            'usuarios': [null],
            'usuarios_cad': [null],
            'usuarios_edt': [null],
            'usuarios_del': [null],

            'veiculos': [null],
            'veiculos_cad': [null],
            'veiculos_edt': [null],
            'veiculos_del': [null],

            'veiculos_oficinas': [null],
            'veiculos_oficinas_cad': [null],
            'veiculos_oficinas_edt': [null],
            'veiculos_oficinas_del': [null],

            'veiculos_policiais': [null],
            'veiculos_policiais_cad': [null],
            'veiculos_policiais_edt': [null],
            'veiculos_policiais_del': [null],

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