import { CommonModule } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => InputTextComponent)
    },
    {
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: InputTextComponent
      },
      provideNgxMask()
    ]   
})
export class InputTextComponent implements ControlValueAccessor{
    @Input() id!: string;
  @Input() label!: string;
  @Input() tipo!: string;
  @Input() mascara!: string;
  @Input() min: number = 0;
  @Input() max!: number;

  protected inputvalor!: any;
  protected control!: AbstractControl;
  protected touched = false;
  protected disabled = true;

  onChange = (inputvalor:any) => {};

  onTouched = () => {};

  change() {
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
}