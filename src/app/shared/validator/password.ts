import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(
  firstControl: string,
  secondControl: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: AbstractControl | null = control.get(firstControl);
    const confirm: AbstractControl | null = control.get(secondControl);

    if (password?.value !== confirm?.value) {
      return { mismatch: true };
    }
    return null;
  };
}
