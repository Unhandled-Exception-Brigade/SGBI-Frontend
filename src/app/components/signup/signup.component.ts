import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { primeraLetraMayuscula } from 'src/app/helpers/validators/primeraLetraMayuscula';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
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
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
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

          // Verificar si el usuario está autenticado antes de redirigir
          if (!this.auth.estaLogueado()) {
            // Agregar un retraso de 1 segundo antes de redirigir al ingresar
            setTimeout(() => {
              this.router.navigate(['/ingresar']);
            }, 600);
          }
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Credenciales ya existentes',
            duration: 4000,
          });
          console.log(err);
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
    return '';
  }
  obtenerErrorCampoContrasena() {
    const campo = this.signupForm.get('contrasena');

    if (campo?.hasError('required')) {
      return 'La contraseña es requerida';
    }

    return '';
  }
}
