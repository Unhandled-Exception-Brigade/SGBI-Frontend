import { ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noEspaciosEnBlanco(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string;
    if (!valor) return null;

    if (/\s/.test(valor)) {
      return {
        noEspaciosEnBlanco: {
          mensaje: 'No se permiten espacios en blanco',
        },
      };
    }

    return null;
  };
}
