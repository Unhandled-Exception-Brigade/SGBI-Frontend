import { FormGroup } from '@angular/forms';

export function ConfirmarContrasena(
  controlName: string,
  matchControlName: string
) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordControl = formGroup.controls[matchControlName];

    if (
      confirmPasswordControl.errors &&
      confirmPasswordControl.errors['ConfirmarContrasena']
    ) {
      return;
    }
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ ConfirmarContrasena: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}
