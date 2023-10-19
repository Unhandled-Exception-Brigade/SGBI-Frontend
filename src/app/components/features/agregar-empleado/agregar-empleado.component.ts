import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/helpers/validators/primeraLetraMayuscula';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { sinTildes } from 'src/app/helpers/validators/sinTildes';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css'],
})
export class AgregarEmpleadoComponent {
  public rol: string = '';

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    if (this.rol == 'Administrador') {
      this.signupForm = this.fb.group({
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            primeraLetraMayuscula(),
            sinTildes(),
          ],
        ],
        primerApellido: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            primeraLetraMayuscula(),
            sinTildes(),
          ],
        ],
        segundoApellido: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            primeraLetraMayuscula(),
            sinTildes(),
          ],
        ],
        cedula: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d+$/), // Asegura que solo se ingresen números
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
        correo: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/),
            Validators.maxLength(50),
            Validators.minLength(5),
          ],
        ],
      });
    } else {
      this.toast.warning({
        detail: 'ADVERTENCIA',
        summary: 'No tiene los permisos para acceder a este modulo',
        duration: 4000,
      });

      this.router.navigate(['/tramites']);
    }
  }

  onSignup() {
    this.markFormGroupTouched(this.signupForm);
    if (this.signupForm.valid) {
      this.auth.registrarse(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.toast.success({
            detail: 'CORRECTO',
            summary: res.message,
            duration: 4000,
          });

          setTimeout(() => {
            this.router.navigate(['/gestionUsuarios']);
          }, 600);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.message,
            duration: 4000,
          });
        },
      });
    } else {
      console.log('Formulario inválido');
    }
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

  obtenerErrorCampoCedula() {
    const campo = this.signupForm.get('cedula');

    if (campo?.hasError('required')) {
      return 'La cédula es requerida';
    }

    if (campo?.hasError('pattern')) {
      return 'La cédula debe tener un formato nacional válido';
    }

    if (campo?.hasError('maxlength')) {
      return 'La cédula debe tener máximo 9 caracteres';
    }

    if (campo?.hasError('minlength')) {
      return 'La cédula debe tener mínimo 9 caracteres';
    }
  }

  obtenerErrorCampoCorreo() {
    const campo = this.signupForm.get('correo');

    if (campo?.hasError('required')) {
      return 'El correo es requerido';
    }
    if (campo?.hasError('email')) {
      return 'El correo debe tener un formato válido';
    }
    if (campo?.hasError('pattern')) {
      return 'El correo debe tener un formato válido';
    }
    if (campo?.hasError('maxlength')) {
      return 'El correo debe tener máximo 50 caracteres';
    }
    if (campo?.hasError('minlength')) {
      return 'El correo debe tener mínimo 5 caracteres';
    }

    return '';
  }
  obtenerErrorCampoNombre() {
    const campo = this.signupForm.get('nombre');

    if (campo?.hasError('required')) {
      return 'El nombre es requerido';
    }
    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    if (campo?.hasError('minlength')) {
      return 'El nombre debe tener mínimo 4 caracteres';
    }
    if (campo?.hasError('sinTildes')) {
      return campo.getError('sinTildes').mensaje;
    }

    return '';
  }
  obtenerErrorCampoPrimerApellido() {
    const campo = this.signupForm.get('primerApellido');

    if (campo?.hasError('required')) {
      return 'El primer apellido es requerido';
    }
    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    if (campo?.hasError('minlength')) {
      return 'El primer apellido debe tener mínimo 4 caracteres';
    }
    if (campo?.hasError('sinTildes')) {
      return campo.getError('sinTildes').mensaje;
    }

    return '';
  }

  obtenerErrorCampoSegundoApellido() {
    const campo = this.signupForm.get('segundoApellido');

    if (campo?.hasError('required')) {
      return 'El segundo apellido es requerido';
    }
    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    if (campo?.hasError('minlength')) {
      return 'El segundo apellido debe tener mínimo 4 caracteres';
    }
    if (campo?.hasError('sinTildes')) {
      return campo.getError('sinTildes').mensaje;
    }

    return '';
  }
}
