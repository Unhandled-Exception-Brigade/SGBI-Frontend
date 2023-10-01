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
  contrasena: string;
  botonDesactivado = false;

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
      nombre: ['', [Validators.required, this.validarNombre]],
      apellido: ['', [Validators.required, this.validarApellido]],
      cedula: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
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

    // Observa cambios en el campo 'nombre' en tiempo real
    this.signupForm.get('nombre').valueChanges.subscribe(() => {
      // Marca el campo como tocado para que se muestren los mensajes de error
      this.signupForm.get('nombre').markAsTouched();
    });

    // Observa cambios en el campo 'apellido' en tiempo real
    this.signupForm.get('apellido').valueChanges.subscribe(() => {
      // Marca el campo como tocado para que se muestren los mensajes de error
      this.signupForm.get('apellido').markAsTouched();
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
      this.botonDesactivado = true;
      this.auth.registrarse(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.signupForm.reset();
          this.toast.success({
            detail: 'CORRECTO',
            summary: res.message,
            duration: 4000,
          });
          this.botonDesactivado = false;

          setTimeout(() => {
            this.router.navigate(['/gestionUsuarios']);
          }, 600);

          // Verificar si el usuario está autenticado antes de redirigir
          // if (!this.auth.estaLogueado()) {
          //   // Agregar un retraso de 1 segundo antes de redirigir al ingresar
          //   setTimeout(() => {
          //     this.router.navigate(['tramites']);
          //   }, 600);
          // }
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

  obtenerErrorCampoCedula() {
    const campo = this.signupForm.get('cedula');

    if (campo?.hasError('required')) {
      return 'La cedula es requerida';
    }
    if (campo?.hasError('minlength') || campo?.hasError('maxlength')) {
      return 'La cedula debe tener exactamente 9 dígitos';
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

  validarNombre(control: FormControl) {
    const nombre = control.value;
    const regexLower = /^[a-z]/; // Primera letra minúscula
    const regexSpecial = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\]/; // Números o caracteres especiales

    const errors = {};

    if (regexLower.test(nombre)) {
      errors['nombreInvalidoLower'] = true;
    }

    if (regexSpecial.test(nombre)) {
      errors['nombreInvalidoSpecial'] = true;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    return null;
  }

  validarApellido(control: FormControl) {
    const apellido = control.value;
    const regexLower = /^[a-z]/; // Primera letra minúscula
    const regexSpecial = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\]/; // Números o caracteres especiales

    const errors = {};

    if (regexLower.test(apellido)) {
      errors['apellidoInvalidoLower'] = true;
    }

    if (regexSpecial.test(apellido)) {
      errors['apellidoInvalidoSpecial'] = true;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    return null;
  }

  desactivarBoton() {
    return this.botonDesactivado
      ? 'btn btn-primary btn-block mt-4 w-100 boton-desactivado'
      : 'btn btn-primary btn-block mt-4 w-100';
  }
}
