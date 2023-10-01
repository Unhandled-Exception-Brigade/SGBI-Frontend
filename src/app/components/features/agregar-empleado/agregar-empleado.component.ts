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
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, this.validarNombre]],
      apellido: ['', [Validators.required, this.validarApellido]],
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

    // Observa cambios en el campo 'nombre' en tiempo real
    this.signupForm.get('nombre').valueChanges.subscribe(() => {
      // Marca el campo 'nombre' como tocado para que se muestren los mensajes de error
      this.signupForm.get('nombre').markAsTouched();

      // Cambia las clases CSS del cuadro del campo 'nombre' según su estado de validación
      const nombreControl = this.signupForm.get('nombre');
      const nombreInputField = document.querySelector('.nombre-input-field'); // Ajusta el selector según tu estructura HTML

      if (nombreControl.valid && nombreControl.touched) {
        nombreInputField.classList.remove('error');
        nombreInputField.classList.add('success');
      } else {
        nombreInputField.classList.remove('success'); // Asegúrate de quitar la clase 'success' cuando no sea válido
        nombreInputField.classList.add('error');
      }
    });

    // Observa cambios en el campo 'apellido' en tiempo real
    this.signupForm.get('apellido').valueChanges.subscribe(() => {
      // Marca el campo 'apellido' como tocado para que se muestren los mensajes de error
      this.signupForm.get('apellido').markAsTouched();

      // Cambia las clases CSS del cuadro del campo 'apellido' según su estado de validación
      const apellidoControl = this.signupForm.get('apellido');
      const apellidoInputField = document.querySelector(
        '.apellido-input-field'
      ); // Ajusta el selector según tu estructura HTML

      if (apellidoControl.valid && apellidoControl.touched) {
        apellidoInputField.classList.remove('error');
        apellidoInputField.classList.add('success');
      } else {
        apellidoInputField.classList.remove('success'); // Asegúrate de quitar la clase 'success' cuando no sea válido
        apellidoInputField.classList.add('error');
      }
    });

    this.signupForm.get('cedula').valueChanges.subscribe(() => {
      // Marca el campo 'cedula' como tocado para mostrar los mensajes de error
      this.signupForm.get('cedula').markAsTouched();
    
      // Obtén el valor actual del campo de cédula
      const cedula = this.signupForm.get('cedula').value;
    
      // Verifica si la cédula contiene caracteres no numéricos
      const contieneCaracteresNoNumericos = /[^\d]/.test(cedula);
    
      // Verifica la longitud de la cédula
      const longitudValida = cedula.length === 9;
    
      // Actualiza los mensajes de error en función de las validaciones
      const errores = {};
    
      if (contieneCaracteresNoNumericos) {
        errores['caracteresNoNumericos'] = true;
      }
    
      if (!longitudValida) {
        errores['longitudInvalida'] = true;
      }
    
      // Elimina la clase de error si no hay errores y la cédula es válida
      if (!contieneCaracteresNoNumericos && longitudValida) {
        const cedulaInputField = document.querySelector('.input-field.cedula-input-field'); // Ajusta el selector según tu estructura HTML
        cedulaInputField.classList.remove('error');
      }
    
      this.signupForm.get('cedula').setErrors(errores);
    });
    
    
  } // fin ngOnInit()

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
            duration: 4000
          });
      
          setTimeout(() => {
            this.router.navigate(['/gestionUsuarios']);
            this.botonDesactivado = false;
          }, 600);

          //Verificar si el usuario está autenticado antes de redirigir
          if (!this.auth.estaLogueado()) {
            setTimeout(() => {
              this.router.navigate(['tramites']);
            }, 600);
          }
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
      return 'La cedula es requerida';
    }
    if (campo?.hasError('minlength') || campo?.hasError('maxlength')) {
      return 'La cedula debe tener exactamente 9 dígitos';
    }
    return '';
  }

  validarCedula(control: FormControl) {
    const cedula = control.value;
    const regex = /^[0-9]{9}$/; // Verifica si la cédula tiene exactamente 9 dígitos

    if (!regex.test(cedula)) {
      return { cedulaInvalida: true };
    }

    // Si llegamos aquí, la cédula tiene 9 dígitos, pero ahora verificamos que no contiene letras ni caracteres especiales
    const regexLetrasCaracteresEspeciales =
      /[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    if (regexLetrasCaracteresEspeciales.test(cedula)) {
      return { cedulaInvalida: true };
    }

    return null; // La cédula es válida
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
