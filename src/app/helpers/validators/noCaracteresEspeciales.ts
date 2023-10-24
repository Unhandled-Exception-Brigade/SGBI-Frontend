import { ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noCaracteresEspeciales(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string;
    if (!valor) return null;

    // Define una expresión regular que permite letras, números y la letra "ñ".
    const pattern = /^[a-zA-Z0-9ñÑ]*$/;

    if (!pattern.test(valor)) {
      return {
        noCaracteresEspeciales: {
          mensaje: 'No se permiten caracteres especiales.',
        },
      };
    }

    return null;
  };
}
