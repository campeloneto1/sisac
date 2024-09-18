import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { InputTextComponent } from "../../../components/input-text/input-text.component";
import { InputSelectComponent } from "../../../components/input-select/input-select.component";
import { InputTextareaComponent } from "../../../components/input-textarea/input-textarea.component";
import { PoliciaisService } from "../../policiais/policiais.service";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { Policiais } from "../../policiais/policial";
import { Veiculos } from "../../veiculos/veiculo";
import { Observable, of } from "rxjs";
import { PaisesService } from "../../paises/paises.service";
import { Paises } from "../../paises/pais";
import { Estados } from "../../estados/estado";
import { Cidades } from "../../cidades/cidade";
import { EstadosService } from "../../estados/estados.service";
import { CidadesService } from "../../cidades/cidades.service";
import { SessionService } from "../../../session.service";
import { User } from "../../users/user";
import { VeiculosPoliciaisService } from "../veiculos-policiais.service";
import { VeiculoPolicial } from "../veiculo-policial";
import { SharedService } from "../../../shared/shared.service";
import { VeiculosPoliciaisAlteracoesService } from "../../veiculos-policiais-alteracoes/veiculos-policiais-alteracoes.service";
import { VeiculoPolicialAlteracao } from "../../veiculos-policiais-alteracoes/veiculo-policial-alteracao";
import { environment } from "../../../../../environments/environments";

@Component({
    selector: '',
    templateUrl: './veiculos-policiais-form-policial.component.html',
    styleUrl: './veiculos-policiais-form-policial.component.css',
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
export class VeiculosPoliciaisFormPolicial implements OnInit, OnDestroy{

    private url = environment.image;

    protected form!: FormGroup;
    protected formdev!: FormGroup;
    protected formfoto!: FormGroup;

    protected policiais$!: Observable<Policiais>;
    protected veiculos$!: Observable<Veiculos>;
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
    protected cidades$!: Observable<Cidades>;
    protected exibir!: number;
    protected veiculoemprestado!: VeiculoPolicial;

    private user!: User;

    protected fotos: Array<any> = [];
    protected foto!: any;

    private subscription!: any;
    private subscription2!: any;
    private subscription3!: any;
    private subscription4!: any;
    private subscription5!: any;
    
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private sharedService: SharedService,
        private policiaisService: PoliciaisService,
        private sessionService: SessionService,
        private veiculosService: VeiculosService,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private veiculosPoliciaisAlteracoesService: VeiculosPoliciaisAlteracoesService,
        private paisesService: PaisesService,
        private estadosService: EstadosService,
        private cidadesService: CidadesService
    ){}

    ngOnInit(): void {
        

        this.form = this.formBuilder.group({
            'id': [null],
            'veiculo': [null, Validators.compose([
                Validators.required,
            ])],
            'policial': [null],
            'etapa': [2],
            'data_inicial': [null],
            'data_final': [null],
            'km_inicial': [null, Validators.compose([
                Validators.required,
            ])],
            'km_final': [null],
            'observacoes': [null],
            'pais': [null, Validators.compose([
                Validators.required,
            ])],
            'estado': [null, Validators.compose([
                Validators.required,
            ])],
            'cidade': [null, Validators.compose([
                Validators.required,
            ])],
        });

        this.formdev = this.formBuilder.group({
            'id': [null],
            'km_final': [null, Validators.compose([
                Validators.required,
            ])],
            'observacoes': [null],
        });

        this.formfoto = this.formBuilder.group({
            'veiculo_policial': [null],
            'foto': [null, Validators.compose([
                Validators.required,
            ])],
            'file': [null, Validators.compose([
                Validators.required,
            ])],
            'observacoes': [null],
        });

        this.subscription3 = this.veiculosPoliciaisService.veiculoPolicial().subscribe({
            next: (data) => {
                if(data){
                    this.exibir = 2;
                    this.veiculoemprestado = data;
                    
                }else{
                    this.exibir = 1;
                }
               
            },
            complete: () => {
                this.loadFotos();
            }
        });
        
        this.user = this.sessionService.getUser();
        this.subscription = this.veiculosService.disponiveis().subscribe({
            next: (data) => {
                data.forEach(element => {
                    if(element.placa_especial){
                        //@ts-ignore
                        element.nome = `${element.modelo.marca.nome} ${element.modelo.nome}, Placa: ${element.placa}, Placa Esp. ${element.placa_especial}, KM Atual: ${element.km_atual}`;
                    }else{
                        //@ts-ignore
                        element.nome = `${element.modelo.marca.nome} ${element.modelo.nome}, Placa: ${element.placa}, KM Atual: ${element.km_atual}`;
                    }
                    
                });
                this.veiculos$ = of(data);
            }
        });
        this.paises$ = this.paisesService.index();
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
        if(this.subscription4){
            this.subscription4.unsubscribe();
        }
    }

    refresh(){
        this.subscription3 = this.veiculosPoliciaisService.veiculoPolicial().subscribe({
            next: (data) => {
                if(data){
                    this.exibir = 2;
                    this.veiculoemprestado = data;
                    
                }else{
                    this.exibir = 1;
                }
               
            },
            complete: () => {
                this.loadFotos();
            }
        });
    }

    reset(){
        this.form.reset();
    }

    proximo(){
        this.form.get('etapa')?.patchValue(this.form.value.etapa + 1);
    }

    anterior(){
        this.form.get('etapa')?.patchValue(this.form.value.etapa - 1);
    }

    cadastrar(){
        if(this.user.policial){
            this.form.get('policial')?.patchValue(this.user.policial.id);

        this.subscription4 = this.veiculosPoliciaisService.create(this.form.value).subscribe({
                next: (data) => {
                    this.veiculosPoliciaisService.veiculoPolicial().subscribe({
                        next: (data) => {
                            this.exibir = 2;
                            this.veiculoemprestado = data;
                            this.formfoto.get('veiculo_policial')?.patchValue(data.id)
                        }
                    });
                },
                error: (error) => {
                    this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
                }
            })
        }
    }

    getEstados(){
        this.estados$ = this.estadosService.wherePais(this.form.get('pais')?.value);
    }

    getCidades(){
        this.cidades$ = this.cidadesService.whereEstado(this.form.get('estado')?.value);
    }

    enviarFotos(){
        this.formfoto.get('veiculo_policial')?.patchValue(this.veiculoemprestado.id)
        this.exibir = 4;
    }

    cancelarFotos(){
        this.formfoto.get('veiculo_policial')?.patchValue(null)
        this.exibir = 2;
        this.refresh();
    }

    cadastrarFoto(){
        this.formfoto.get('veiculo_policial')?.patchValue(this.veiculoemprestado.id)
        this.veiculosPoliciaisAlteracoesService.create(this.formfoto.value).subscribe({
            next: (data) => {
                this.formfoto.reset();
            }
        });
    }

    devolver(){
        this.formdev.get('id')?.patchValue(this.veiculoemprestado.id);
        this.formdev.get('observacoes')?.patchValue(this.veiculoemprestado.observacoes);
        this.exibir = 3;

    }

    confirmardev(){
        this.veiculosPoliciaisService.receber(this.formdev.value).subscribe({
            next: (data:any) => {
                this.toastr.success('Edição realizada com sucesso!');
                this.formdev.reset();
                this.exibir = 2;
                this.veiculosPoliciaisService.find(this.veiculoemprestado.id || 0).subscribe({
                    next: (data) => {
                        this.veiculoemprestado = data;
                    }
                })
            },
            error: (error:any) => {
                this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
            }
        });
    }

    canceldev(){
        this.formdev.reset()
        this.exibir = 2;
    }

    uploadFoto(event: any){
        var fileName = "";
        const formData = new FormData();
        const file:File = event.target.files[0];
        if (file) {
          fileName = file.name;
          formData.append("file", file);
          //formData.append("id", this.policial.id+'');
          this.sharedService.uploadFoto(formData).subscribe({
            next: (data) => {
                //console.log(data);
                //@ts-ignore
                this.formfoto.get('foto')?.patchValue(data.data)
            }
          })
        }
      }

      showFoto(data:any){
        this.foto = data;
      }

      loadFotos(){
        this.fotos = [];
        this.veiculoemprestado.veiculos_policiais_alteracoes?.map(data => {
            var obj = {
                file: data.foto
            }
            this.sharedService.getFile(obj).subscribe({
                next: (data2) => {
                    const url = window.URL.createObjectURL(data2);
                    this.fotos.push(
                        {
                            //@ts-ignore
                            foto: url,
                            observacoes: data.observacoes,
                            id: data.id
                        }
                    );
                }
            });
        });
      }

      
}