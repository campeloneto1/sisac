import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { InputTextComponent } from '../../../components/input-text/input-text.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PoliciaisDiariasService } from '../policiais-diarias.service';
import { PolicialDiaria } from '../policial-diaria';
import { ToastrService } from 'ngx-toastr';
import { InputSelectComponent } from '../../../components/input-select/input-select.component';
import { Observable, of, tap } from 'rxjs';
import { Policiais } from '../../policiais/policial';
import { PoliciaisService } from '../../policiais/policiais.service';
import { InputTextareaComponent } from '../../../components/input-textarea/input-textarea.component';
import { DiariasStatus } from '../../diarias-status/diaria-status';
import { DiariasTipos, DiariaTipo } from '../../diarias-tipos/diaria-tipo';
import { DiariasStatusService } from '../../diarias-status/diarias-status.service';
import { DiariasTiposService } from '../../diarias-tipos/diarias-tipos.service';
import { Paises } from '../../paises/pais';
import { Estados } from '../../estados/estado';
import { Cidades } from '../../cidades/cidade';
import { PaisesService } from '../../paises/paises.service';
import { EstadosService } from '../../estados/estados.service';
import { CidadesService } from '../../cidades/cidades.service';
import { SessionService } from '../../../session.service';

@Component({
  selector: 'app-policiais-diarias-form',
  templateUrl: './policiais-diarias-form.component.html',
  styleUrl: './policiais-diarias-form.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputSelectComponent,
    InputTextareaComponent,
  ],
})
export class PoliciaisDiariasFormComponent implements OnInit, OnDestroy {
  protected form!: FormGroup;

  protected policiais$!: Observable<Policiais>;
  protected diariasstatus$!: Observable<DiariasStatus>;
  protected diariastipos$!: Observable<DiariasTipos>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

  private subscription!: any;

  @Output('refresh') refresh: EventEmitter<PolicialDiaria> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private policiaisDiariasService: PoliciaisDiariasService,
    private policiaisService: PoliciaisService,
    private diariasStatusService: DiariasStatusService,
    private diariasTiposService: DiariasTiposService,
    private paisesService: PaisesService,
    private estadosService: EstadosService,
    private cidadesService: CidadesService,
    private sessionService: SessionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null],
      policial: [null, Validators.compose([Validators.required])],
      data_inicial: [null, Validators.compose([Validators.required])],
      data_final: [null],
      pais: [null, Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])],
      cidade: [null, Validators.compose([Validators.required])],
      quant_diarias: [null],
      valor: [null],
      acrescimo: [
        null,
        Validators.compose([Validators.min(0), Validators.max(100)]),
      ],
      ajuda_custo: [null],
      valor_total: [null],
      observacoes: [null],
      doe: [null],
      nup: [null],
      diaria_status: [1],
      diaria_tipo: [null, Validators.compose([Validators.required])],
      subunidade: [null],
    });

    this.subscription = this.policiaisService.disponiveis().subscribe({
      next: (data) => {
        data.forEach((element) => {
          if (element.numeral) {
            element.nome = `${element.graduacao.abreviatura} ${element.numeral} ${element.nome_guerra}, ${element.matricula}`;
          } else {
            element.nome = `${element.graduacao.abreviatura} ${element.nome_guerra}, ${element.matricula}`;
          }
        });
        this.policiais$ = of(data);
      },
    });

    this.diariasstatus$ = this.diariasStatusService.index();
    this.diariastipos$ = this.diariasTiposService.index();
    this.paises$ = this.paisesService.index();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cadastrar() {
    if (this.form.value.valor && this.form.value.quant_diarias) {
      this.form.get('valor_total')?.patchValue(this.calcValue());
    }
    delete this.form.value.pais;
    delete this.form.value.estado;
    if (this.form.value.id) {
      this.policiaisDiariasService
        .update(this.form.value.id, this.form.value)
        .subscribe({
          next: (data: any) => {
            this.toastr.success('Edição realizada com sucesso!');
            this.form.reset();
            this.refresh.emit();
          },
          error: (error: any) => {
            this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
          },
        });
    } else {
      if(this.sessionService.getSubunidade()){
        this.form.get('subunidade')?.patchValue(this.sessionService.getSubunidade());
      }else{
          this.toastr.error('Selecione uma subunidade!');
      }
      this.policiaisDiariasService.create(this.form.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Cadastro realizado com sucesso!');
          this.form.reset();
          this.refresh.emit();
        },
        error: (error: any) => {
          this.toastr.error('Erro ao cadastrar, tente novamente mais tarde!');
        },
      });
    }
  }

  editar(data: PolicialDiaria) {
    this.form.patchValue(data);
    this.form.get('policial')?.patchValue(data.policial.id);
    this.form.get('diaria_status')?.patchValue(data.diaria_status.id);
    this.form.get('diaria_tipo')?.patchValue(data.diaria_tipo.id);
    if (data.cidade) {
      this.form.get('pais')?.patchValue(data.cidade.estado.pais.id);
      this.form.get('estado')?.patchValue(data.cidade.estado.id);
      this.form.get('cidade')?.patchValue(data.cidade.id);
      this.getEstados();
      this.getCidades();
    }
  }

  getEstados() {
    this.estados$ = this.estadosService.wherePais(this.form.get('pais')?.value);
  }

  getCidades() {
    this.cidades$ = this.cidadesService.whereEstado(
      this.form.get('estado')?.value
    );
  }

  setValor() {
    
      this.diariastipos$
        .pipe(
          tap((data: DiariasTipos) => {
            // Procura no array se há correspondência entre os IDs
            const encontrado = data.find(
              (item: DiariaTipo) => item.id === this.form.value.diaria_tipo
            );
            if (encontrado) {
              this.form.get('valor')?.patchValue(encontrado.valor);
              if(encontrado.ajuda_custo){
                this.form.get('ajuda_custo')?.patchValue(encontrado.valor);
              }
            }
          })
        )
        .subscribe();
    
  }

  setQuantDiarias() {
    const dtInicialStr = this.form.value.data_inicial; // Recebendo a data como string no formato yyyy-MM-dd
    const dtFinalStr = this.form.value.data_final;

    const dtInicial = new Date(dtInicialStr);
    const dtFinal = new Date(dtFinalStr);

    if (dtInicial.getTime() === dtFinal.getTime()) {
      // Se as datas forem iguais
      this.form.get('quant_diarias')?.patchValue(0.5);
    } else {
      const diffEmMilissegundos = dtFinal.getTime() - dtInicial.getTime();
      const diffEmDias = diffEmMilissegundos / (1000 * 60 * 60 * 24);

      let totalDiarias = 0;

      if (diffEmDias >= 1) {
        totalDiarias = diffEmDias - 1 + 1.5; // Primeiro dia meia diária + dias inteiros
      } else if (diffEmDias > 0 && diffEmDias < 1) {
        totalDiarias = 1; // Intervalos menores que um dia
      }
      this.form.get('quant_diarias')?.patchValue(totalDiarias);
    }
  }

  calcValue(): string {
    let valor = parseFloat(
       this.form.value.valor ? this.form.value.valor : '0'
    );
    if (this.form.value.quant_diarias) {
      valor = valor * this.form.value.quant_diarias;
    }
    const acrescimo = parseFloat(
       this.form.value.acrescimo
        ? this.form.value.acrescimo
        : '0'
    );
    const ajudaCusto = parseFloat(
       this.form.value.ajuda_custo
        ? this.form.value.ajuda_custo
        : '0'
    );

    let resultado = 0;

    if (valor && acrescimo && ajudaCusto) {
      resultado = (valor + valor * (acrescimo / 100)) + ajudaCusto;
    } else if (valor && acrescimo) {
      resultado = valor + valor * (acrescimo / 100);
    } else if (valor && ajudaCusto) {
      resultado = valor + ajudaCusto;
    } else if (valor) {
      resultado = valor;
    }

    return resultado.toFixed(2);
  }
}
