import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { Policiais } from "../../policiais/policial";
import { PoliciaisService } from "../../policiais/policiais.service";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Materiais } from "../../materiais/material";
import { MaterialPolicial } from "../material-policial";
import { MateriaisPoliciaisService } from "../materiais-policiais.service";
import { MateriaisService } from "../../materiais/materiais.service";
import { SessionService } from "../../../session.service";

@Component({
    selector: "app-materiais-policiais-form",
    templateUrl: './materiais-policiais-form.component.html',
    styleUrl: './materiais-policiais-form.component.css',
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
export class MateriaisPoliciaisFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected policiais$!: Observable<Policiais>;
    protected materiais$!: Observable<Materiais>;
    protected materiaisselected:any = [];
    protected editando: boolean = false;
    protected maxamon: number = 1;
    private subscription!:any;
    private subscription2!:any;

    @Output('refresh') refresh: EventEmitter<MaterialPolicial> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisPoliciaisService: MateriaisPoliciaisService,
        private policiaisService: PoliciaisService,
        private materiaisService: MateriaisService,
        private toastr: ToastrService,
        private sessionService: SessionService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'policial': [null, Validators.compose([
                Validators.required,
            ])],
            'material': [null],
            'quantidade': [1, Validators.compose([
                Validators.min(1),
            ])],
            'observacoes': [null], 
            'cautela': [null],  
            'materiais': [null],   
            'subunidade': [null],               
        });

        this.subscription = this.policiaisService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.numeral){
                        element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
                    }else{
                        element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}`;
                    }
                    
                });
                this.policiais$ = of(data);
            }
        });

        this.subscription2 = this.materiaisService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.serial){
                        element.serial = `${element.material_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, Disp: ${element.quantidade_disponivel}`;
                    }else {
                        element.serial = `${element.material_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome}, Disp: ${element.quantidade_disponivel}`;
                    }
                });
                this.materiais$ = of(data);
            }
        });
    }
    reset(){
        this.form.reset();
        this.editando = false;
        this.form.get('quantidade')?.patchValue(1);
    }

    ngOnDestroy(): void {
        
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
    }

    cadastrar(){
        if(this.form.value.cautela !== true){
            this.form.get('cautela')?.patchValue(null);
        }
        
        if(this.form.value.id){
            delete this.form.value.materiais;
            delete this.form.value.material;
            delete this.form.value.quantidade;

            this.materiaisPoliciaisService.update(this.form.value.id, this.form.value).subscribe({
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
            this.form.get('materiais')?.patchValue(this.materiaisselected);
            if(this.sessionService.getSubunidade()){
                this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
            }else{
                this.toastr.error('Selecione uma subunidade!');
            }
            this.materiaisPoliciaisService.create(this.form.value).subscribe({
                next: (data:any) => {
                    this.toastr.success('Cadastro realizado com sucesso!');
                    this.form.reset();
                    this.refresh.emit();
                    this.materiaisselected = [];
                },
                error: (error:any) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            });
        }
       
    }

    async select(){
        if(this.form.value.material){
            var mat;
            await this.materiais$.subscribe((data) => {
                mat =  data.filter((element) => {
                    return element.id == this.form.value.material
                })
            });
            
            if(mat){
                //@ts-ignore
                this.maxamon = mat[0].quantidade_disponivel;
            }
        }
    }

    editar(data: MaterialPolicial){
        this.editando = true;
        this.form.patchValue(data);
        this.form.get('policial')?.patchValue(data.policial.id);
    }

    addMaterial(){
        

        if(this.form.value.quantidade > 0){
            let arma;
            this.materiais$.subscribe((data) => {
                arma =  data.filter((element) => {
                    return element.id == this.form.value.material
                })
            });

            //@ts-ignore
            if(this.form.value.quantidade > arma[0].quantidade_disponivel){
                //@ts-ignore
                this.form.get('quantidade')?.patchValue(arma[0].quantidade_disponivel);
            }

            this.materiaisselected.push(
                {
                    materialId: this.form.value.material,
                    //@ts-ignore
                    material: arma[0],
                    quantidade: this.form.value.quantidade  
                }
            );
            this.form.get('material')?.patchValue(null);
            this.form.get('quantidade')?.patchValue(1);
        }
    }

    removeMaterial(index:number){
        this.materiaisselected.splice(index, 1);
    }
   
}