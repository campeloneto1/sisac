import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TitleComponent } from "../../components/title/title.component";
import { Policiais } from "../policiais/policial";
import { forkJoin, map, Observable, tap } from "rxjs";
import { Setores } from "../setores/setor";
import { SetoresService } from "../setores/setores.service";
import { InputSelectComponent } from "../../components/input-select/input-select.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SharedService } from "../../shared/shared.service";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@Component({
    selector: "",
    templateUrl: "./quadro-fotos.component.html",
    styleUrl: "./quadro-fotos.component.css",
    standalone: true,
    imports: [
        CommonModule, 
        TitleComponent, 
        RouterModule,
        ReactiveFormsModule,
        InputSelectComponent,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
    ]

})
export class QuadoFotosComponent implements OnInit{
    protected data$!: Observable<Policiais>;
    protected setores$!: Observable<Setores>;
    protected form!: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private setoresService: SetoresService,
        private sharedService: SharedService
    ){

    }
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'id': [null],
        });

        this.setores$ = this.setoresService.index();
    }

    protected getPoliciais() {
        this.data$ = this.setoresService.getPoliciais(this.form.value.id).pipe(
            // Manipulando os dados recebidos
            tap((data: Policiais) => {
                // Cria um array de Observables para cada foto
                const fotoObservables = data.map((item) => this.getfile(item.foto!));
        
                // Usamos forkJoin para aguardar todas as URLs serem resolvidas
                forkJoin(fotoObservables).subscribe({
                    next: (urls: string[]) => {
                        // Substitui os valores de 'foto' com a URL gerada
                        data.forEach((item, index) => {
                            item.foto = urls[index];  // Substitui 'foto' pelo valor da URL gerada
                        });
        
                        // Ao final, retornamos o array de policiais com as fotos atualizadas
                        this.data$ = new Observable<Policiais>((observer) => {
                            observer.next(data);  // Emitindo os dados modificados com as URLs das fotos
                            observer.complete();
                        });
                    },
                    error: (err) => {
                        console.error('Erro ao carregar fotos:', err);
                    }
                });
            })
        );
    }

    protected getfile(data: string): Observable<string> {
        const obj = { file: data };
        
        // Retorna o Observable que vai gerar a URL da foto
        return this.sharedService.getFile(obj).pipe(
          map((file) => {
            // Cria a URL da imagem
            return window.URL.createObjectURL(file);
          })
        );
      }

    protected  encodeId(id: any){
        var encoded = this.sharedService.encodeId(id);
        return encoded;
      }
}