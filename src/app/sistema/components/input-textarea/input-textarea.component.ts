import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@wfpena/angular-wysiwyg';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextareaComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputTextareaComponent,
    },
  ],
})
export class InputTextareaComponent implements ControlValueAccessor {
    @Input() id!: string;
    @Input() label!: string;
    @Input() tipo!: string;
    @Input() height!: string;
  
    protected editorConfig!: AngularEditorConfig;
  
    protected inputvalor!: any;
    protected control!: AbstractControl;
  
    protected touched = false;
  
    protected disabled = true;
  
    ngOnDestroy(): void {
      
    }
  
    ngOnInit(): void {
      this.editorConfig = {
        editable: true,
          spellcheck: true,
          height: `${this.height ? this.height : 200}px`,
          minHeight: '0',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'Insira o texto aqui...',
          defaultParagraphSeparator: '',
          defaultFontName: '',
          defaultFontSize: '4px',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
         
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
          {
            name: 'table 1x2',
            class: '<!--',
            tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
          },
          {
            name: 'table 2x2',
            class: '<!--',
            tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
          },  
          {
            name: 'table 2x3',
            class: '<!--',
            tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
          },       
          {
            name: 'table 3x3',
            class: '<!--',
            tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
          }
        ],
        uploadUrl: environment.url+'/upload-image',
        //upload: (file: File) => { console.log(file) },
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
          ['strikeThrough',
          'subscript',
          'superscript',
          'insertImage',
          'insertVideo',
          'toggleEditorMode'
        ],
        ]
    };
        console.log(this.editorConfig)
    }
  
    onChange = (inputvalor: any) => {};
  
    onTouched = () => {};
  
    change() {
     //console.log(this.inputvalor);
      this.markAsTouched();
      if (!this.disabled) {     
        //console.log(this.inputvalor)
        this.onChange(this.inputvalor);
      }
      
    }
  
    writeValue(inputvalor: any) {
      this.inputvalor = inputvalor;
    }
  
    registerOnChange(onChange: any) {
      this.onChange = onChange;
    }
  
    registerOnTouched(onTouched: any) {
      this.onTouched = onTouched;
    }
  
    markAsTouched() {
      if (!this.touched) {
        this.onTouched();
        this.touched = true;
      }
    }
  
    setDisabledState(disabled: boolean) {
      this.disabled = disabled;
    }
  
    validate(control: AbstractControl): ValidationErrors | void  {
      this.control = control;
      //console.log(control)
    }

    isIPhone(): boolean {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      // Verifica se o userAgent contém "iPhone"
      return /iPhone/.test(userAgent) && !/iPad/.test(userAgent);
    }
}
