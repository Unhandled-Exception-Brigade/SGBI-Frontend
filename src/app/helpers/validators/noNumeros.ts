import { ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noNumeros(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string;
    if (!valor) return null;

    // Define una expresión regular que permite solo letras y la letra "ñ".
    const pattern = /^[a-zA-ZñÑ]*$/;

    if (!pattern.test(valor)) {
      return {
        noNumeros: {
          mensaje: 'No se permiten números.',
        },
      };
    }

    return null;
  };
}
