import { CommonModule } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';

@Component({
    selector: 'input-select',
    templateUrl: './input-select.component.html',
    styleUrl: './input-select.component.css',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSelectModule
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => InputSelectComponent)
    },
    {
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: InputSelectComponent
      },
    ]   
})
export class InputSelectComponent implements ControlValueAccessor{
    inputvalor = 0;
  control!: AbstractControl;

  @Input() id!: string;
  @Input() label!: string;
  @Input() data$!: Observable<any>;
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;
  @Input() allowclear: boolean = true;
  @Input() optionid: string = 'id';
  @Input() optionname: any = 'nome';

  ngOnInit(): void {
    
  }

  onChange = (inputvalor: number) => {};

  onTouched = () => {};

  touched = false;

  change() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.inputvalor);
    }
  }

  writeValue(inputvalor: number) {
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

  validate(control: AbstractControl): ValidationErrors | void {
    this.control = control;
    //console.log(control)
  }
}