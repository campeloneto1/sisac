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
import { ToastrService } from 'ngx-toastr';
import { InputSelectComponent } from '../../../components/input-select/input-select.component';
import { Observable, of, tap } from 'rxjs';
import { Policiais } from '../../policiais/policial';
import { PoliciaisService } from '../../policiais/policiais.service';
import { InputTextareaComponent } from '../../../components/input-textarea/input-textarea.component';
import { Graduacoes } from '../../graduacoes/graduacao';
import { PoliciaisPromocoesService } from '../policiais-promocoes.service';
import { GraduacoesService } from '../../graduacoes/graduacoes.service';
import { PolicialPromocao } from '../policial-promocao';

@Component({
  selector: 'app-policiais-promocoes-form',
  templateUrl: './policiais-promocoes-form.component.html',
  styleUrl: './policiais-promocoes-form.component.css',
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
export class PoliciaisPromocoesFormComponent implements OnInit, OnDestroy {
  protected form!: FormGroup;

  protected policiais$!: Observable<Policiais>;
  protected graduacoes$!: Observable<Graduacoes>;

  private subscription!: any;

  @Output('refresh') refresh: EventEmitter<PolicialPromocao> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private policiaisPromocoesService: PoliciaisPromocoesService,
    private policiaisService: PoliciaisService,
    private graduacoesService: GraduacoesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null],
      policial: [null, Validators.compose([Validators.required])],
      graduacao: [null, Validators.compose([Validators.required])],
      data_promocao: [null, Validators.compose([Validators.required])],
      boletim: [null],
      observacoes: [null],
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

    this.graduacoes$ = this.graduacoesService.index();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cadastrar() {
    if (this.form.value.id) {
      this.policiaisPromocoesService
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
      this.policiaisPromocoesService.create(this.form.value).subscribe({
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

  editar(data: PolicialPromocao) {
    this.form.patchValue(data);
    this.form.get('policial')?.patchValue(data.policial.id);
    this.form.get('graduacao')?.patchValue(data.graduacao.id);
  }
}
