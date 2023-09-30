import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/helpers/validators/primeraLetraMayuscula';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css'],
})
export class AgregarEmpleadoComponent {
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, primeraLetraMayuscula()]],
      apellido: ['', [Validators.required, primeraLetraMayuscula()]],
      cedula: ['', [Validators.required, Validators.minLength(9)]],
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
  }
  onSignup() {
    this.markFormGroupTouched(this.signupForm);

    if (this.signupForm.valid) {
      this.auth.registrarse(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.signupForm.reset();
          this.toast.success({
            detail: 'CORRECTO',
            summary: res.message,
            duration: 4000,
          });

          this.router.navigate(['/gestionUsuarios']);
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

  obtenerErrorCampoNombre() {
    const campo = this.signupForm.get('nombre');

    if (campo?.hasError('required')) {
      return 'El nombre es requerido';
    }
    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }
  obtenerErrorCampoApellido() {
    const campo = this.signupForm.get('apellido');

    if (campo?.hasError('required')) {
      return 'El apellido es requerido';
    }
    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  obtenerErrorCampoCedula() {
    const campo = this.signupForm.get('cedula');

    if (campo?.hasError('required')) {
      return 'La cedula es requerida';
    }
    if (campo?.hasError('minlength')) {
      return 'La cedula debe tener 9 digitos';
    }
    return '';
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
}
