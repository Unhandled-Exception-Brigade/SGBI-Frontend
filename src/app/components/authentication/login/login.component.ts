import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { CambiarContrasenaService } from 'src/app/services/cambiar-contrasena.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidenavService } from 'src/app/services/app-services/sidenav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public resetearContrasenaEmail!: string;
  public esValidoElCorreo!: boolean;

  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private usuarioService: UsuarioService,
    private sideNav: SidenavService,
    private cambiarContrasenaService: CambiarContrasenaService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cedula: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ], // Utiliza un arreglo para los validadores
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
    });
    this.sideNav.ocultar();
  }

  ngOnDestroy() {
    this.sideNav.mostar();
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    this.markFormGroupTouched(this.loginForm);

    if (this.loginForm.valid) {
      /*console.log(this.loginForm.value);*/
      this.auth.ingresar(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();

          this.auth.guardarToken(res.accessToken);
          this.auth.guardarRefreshToken(res.refreshToken);

          const tokenPayload = this.auth.decodedToken();

          this.usuarioService.setNombreUsuario(
            tokenPayload[
              'http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'
            ]
          );
          this.usuarioService.setRolUsuario(
            tokenPayload[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ]
          );

          this.toast.success({
            detail: 'CORRECTO',
            summary: 'Bienvenido al sistema',
            duration: 4000,
          });

          // Agregar un retraso de 1 segundo antes de redirigir al dashboard
          setTimeout(() => {
            this.router.navigate(['/tramites']);
          }, 1000); // 1000 milisegundos = 1 segundo
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error,
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
      return 'La cedula es requerida';
    }
    if (campo?.hasError('minlength') || campo?.hasError('maxlength')) {
      return 'La cedula debe tener exactamente 9 dígitos';
    }

    return '';
  }

  obtenerErrorCampoContrasena() {
    const campo = this.loginForm.get('contrasena');

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
      return 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un caracter especial';
    }

    return '';
  }
  validarCorreo(event: string) {
    const valor = event;
    const patron = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;

    this.esValidoElCorreo = patron.test(valor);
    return this.esValidoElCorreo;
  }
  confirmarEnvio() {
    if (this.validarCorreo(this.resetearContrasenaEmail)) {
      console.log(this.resetearContrasenaEmail);

      this.cambiarContrasenaService
        .sendResetPasswordLink(this.resetearContrasenaEmail)
        .subscribe({
          next: (res) => {
            this.toast.success({
              detail: 'CORRECTO',
              summary: res.message,
              duration: 4000,
            });

            this.resetearContrasenaEmail = '';
            const buttonRef = document.getElementById('closeBtn');
            buttonRef?.click();
          },
          error: (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: err.message,
              duration: 4000,
            });
          },
        });
    }
  }
}
