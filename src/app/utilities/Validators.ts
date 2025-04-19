import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customEmailValidator(emailPattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const valid = emailPattern.test(value);

    return valid ? null : { invalidEmail: true };
  };
}