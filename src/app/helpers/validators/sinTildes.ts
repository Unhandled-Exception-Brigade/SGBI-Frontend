import { ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function sinTildes(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = <string>control.value;
    if (!valor) return null;

    // Utiliza una expresión regular para buscar tildes en el valor
    const tildesEncontradas = valor.match(/[áéíóúÁÉÍÓÚ]/g);

    if (tildesEncontradas && tildesEncontradas.length > 0) {
      return {
        sinTildes: {
          mensaje: 'No se permiten tildes',
        },
      };
    }

    return null;
  };
}
