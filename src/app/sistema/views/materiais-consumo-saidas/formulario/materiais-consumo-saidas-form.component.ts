import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MateriaisConsumoSaidasService } from "../materiais-consumo-saidas.service";
import { MaterialConsumoSaida } from "../material-consumo-saida";
import { ToastrService } from "ngx-toastr";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { Observable, of } from "rxjs";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { Users } from "../../users/user";
import { MateriaisConsumo } from "../../materiais-consumo/material-consumo";
import { UsersService } from "../../users/users.service";
import { MateriaisConsumoService } from "../../materiais-consumo/materiais-consumo.service";

@Component({
    selector: "app-materiais-consumo-saidas-form",
    templateUrl: './materiais-consumo-saidas-form.component.html',
    styleUrl: './materiais-consumo-saidas-form.component.css',
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
export class MateriaisConsumoSaidasFormComponent implements OnInit, OnDestroy{
    
    protected form!: FormGroup;

    protected users$!: Observable<Users>;
    protected materiaisconsumo$!: Observable<MateriaisConsumo>;
    protected materiaisselected:any = [];
    protected editando: boolean = false;
    protected maxamon: number = 1;
    private subscription!:any;
    private subscription2!:any;

    @Output('refresh') refresh: EventEmitter<MaterialConsumoSaida> = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private materiaisConsumoSaidasService: MateriaisConsumoSaidasService,
        private usersService: UsersService,
        private materiaisConsumoService: MateriaisConsumoService,
        private toastr: ToastrService,
    ){}
    

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': [null],
            'user': [null, Validators.compose([
                Validators.required,
            ])],
            'material_consumo': [null],
            'quantidade': [1, Validators.compose([
                Validators.min(1),
            ])],
            'observacoes': [null], 
            'materiais': [null],                  
        });

        this.subscription = this.usersService.index().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.policial){
                        if(element.policial.numeral){
                            element.nome = `${element.policial.graduacao.abreviatura} ${element.policial.numeral} ${element.policial.nome_guerra}, ${element.policial.matricula}`;
                        }else{
                            element.nome = `${element.policial.graduacao.abreviatura} ${element.policial.nome_guerra}, ${element.policial.matricula}`;
                        }
                    }else{
                        element.nome = `${element.nome}, ${element.cpf}`;
                    }
                    
                });
                this.users$ = of(data);
            }
        });

        this.subscription2 = this.materiaisConsumoService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    
                    if(element.serial){
                        element.serial = `${element.material_consumo_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome} ${element.serial}, Disp: ${element.quantidade}`;
                    }else{
                        element.serial = `${element.material_consumo_tipo.nome} ${element.modelo.marca.nome} ${element.modelo.nome}, Disp: ${element.quantidade}`;
                    }
                });
                this.materiaisconsumo$ = of(data);
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
        
        if(this.form.value.id){
            delete this.form.value.materiais;
            delete this.form.value.material_consumo;
            delete this.form.value.quantidade;

            this.materiaisConsumoSaidasService.update(this.form.value.id, this.form.value).subscribe({
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
            this.materiaisConsumoSaidasService.create(this.form.value).subscribe({
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
        if(this.form.value.armamento){
            var arma;
            await this.materiaisconsumo$.subscribe((data) => {
                arma =  data.filter((element) => {
                    return element.id == this.form.value.material_consumo
                })
            });
            
            if(arma){
                //@ts-ignore
                this.maxamon = arma[0].quantidade;
            }
        }
    }

    editar(data: MaterialConsumoSaida){
        this.editando = true;
        this.form.patchValue(data);
        this.form.get('user')?.patchValue(data.user.id);
    }

    addMaterial(){
        

        if(this.form.value.quantidade > 0){
            let material;
            this.materiaisconsumo$.subscribe((data) => {
                material =  data.filter((element) => {
                    return element.id == this.form.value.material_consumo
                })
            });

            //@ts-ignore
            if(this.form.value.quantidade > material[0].quantidade_disponivel){
                //@ts-ignore
                this.form.get('quantidade')?.patchValue(material[0].quantidade_disponivel);
            }

            this.materiaisselected.push(
                {
                    material_consumoId: this.form.value.material_consumo,
                    //@ts-ignore
                    armamento: material[0],
                    quantidade: this.form.value.quantidade  
                }
            );
            this.form.get('material_consumo')?.patchValue(null);
            this.form.get('quantidade')?.patchValue(1);
        }
    }

    removeMaterial(index:number){
        this.materiaisselected.splice(index, 1);
    }
   
}