import { ValidatorFn, AbstractControl } from '@angular/forms';
export function confirmPasswordValidator(sourceControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const result = control.value != sourceControl.value;
      return result ? {'confirmPassword': {value: control.value}} : null;
    };
  }
