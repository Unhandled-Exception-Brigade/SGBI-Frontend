import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ConfirmarContrasena } from 'src/app/helpers/validators/confirmarContrasena';
import { ActivatedRoute, Router } from '@angular/router';
import { CambiarContrasenaService } from 'src/app/services/cambiar-contrasena.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  botonDesactivado = false;

  resetForm!: FormGroup;
  correo!: string;
  correoToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cambiarContrasenaService: CambiarContrasenaService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        contrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/
            ),
          ],
        ],
        confirmarContrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/
            ),
          ],
        ],
      },
      {
        validator: ConfirmarContrasena('contrasena', 'confirmarContrasena'),
      }
    );

    this.activatedRoute.queryParams.subscribe((params) => {
      this.correo = params['email'];
      let urlToken = params['code'];

      if (this.correo && urlToken) {
        // Los parámetros requeridos están presentes, puedes procesarlos
        this.correoToken = urlToken.replace(/ /g, '+');
      } else {
        this.toast.warning({
          detail: 'ADVERTENCIA',
          summary: 'No cuenta con el token para cambiar la contraseña',
          duration: 4000,
        });

        this.router.navigate(['/tramites']);
      }
    });
  }

  desactivarBoton() {
    return this.botonDesactivado
      ? 'btn btn-primary btn-block mt-4 w-100 boton-desactivado'
      : 'btn btn-primary btn-block mt-4 w-100';
  }

  reset() {
    if (this.resetForm.valid) {
      this.resetPasswordObj.correo = this.correo;
      this.resetPasswordObj.correoToken = this.correoToken;

      this.resetPasswordObj.nuevaContrasena = this.resetForm.value.contrasena;
      this.resetPasswordObj.confirmarContrasena =
        this.resetForm.value.confirmarContrasena;

      this.cambiarContrasenaService
        .resetPassword(this.resetPasswordObj)
        .subscribe({
          next: (res) => {
            console.log(res.message);
            this.toast.success({
              detail: 'CORRECTO',
              summary: 'Contraseña cambiada exitosamente',
              duration: 4000,
            });

            this.router.navigate(['/ingresar']);
          },
          error: (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: err.error,
              duration: 4000,
            });
          },
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  obtenerErrorCampoContrasena() {
    const campo = this.resetForm.get('contrasena');

    if (campo?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (campo?.hasError('minlength')) {
      return 'La contraseña debe tener mínimo 8 caracteres';
    }
    if (campo?.hasError('maxlength')) {
      return 'La contraseña debe tener máximo 20 caracteres';
    }
    if (campo?.hasError('pattern')) {
      return 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial';
    }

    return '';
  }
  obtenerErrorCampoConfirmarContrasena() {
    const campo = this.resetForm.get('confirmarContrasena');
    if (campo?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (campo?.hasError('minlength')) {
      return 'La contraseña debe tener mínimo 8 caracteres';
    }
    if (campo?.hasError('maxlength')) {
      return 'La contraseña debe tener máximo 20 caracteres';
    }
    if (campo?.hasError('pattern')) {
      return 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial';
    }
    if (campo?.hasError('ConfirmarContrasena')) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }
}
