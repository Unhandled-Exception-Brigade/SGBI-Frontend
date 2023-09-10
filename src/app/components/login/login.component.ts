import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(9)]], // Utiliza un arreglo para los validadores
      contrasena: ['', [Validators.required]],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    this.markFormGroupTouched(this.loginForm);

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.ingresar(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.guardarToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          this.usuarioService.setNombreUsuario(tokenPayload.unique_name);
          this.usuarioService.setRolUsuario(tokenPayload.role);
          this.toast.success({
            detail: 'CORRECTO',
            summary: res.message,
            duration: 4000,
          });
          // Agregar un retraso de 1 segundo antes de redirigir al dashboard
          setTimeout(() => {
            this.router.navigate(['/panel']);
          }, 1000); // 1000 milisegundos = 1 segundo
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Credenciales incorrectas',
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
    const campo = this.loginForm.get('cedula');

    if (campo?.hasError('required')) {
      return 'La cédula es requerida';
    }

    if (campo?.hasError('minlength')) {
      // Asegúrate de usar 'minlength' en minúsculas
      return 'La cédula debe tener 9 dígitos';
    }

    return '';
  }

  obtenerErrorCampoContrasena() {
    const campo = this.loginForm.get('contrasena');

    if (campo?.hasError('required')) {
      return 'La contraseña es requerida';
    }

    // Agregar más validaciones y mensajes de error según sea necesario...

    return '';
  }
}
