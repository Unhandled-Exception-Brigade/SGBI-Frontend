import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {YearPickerComponent} from 'src/app/components/dropdowns/year-picker/year-picker.component'

declare var $: any; // Declara jQuery para su uso en TypeScript

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientoComponent implements OnInit {
  public rol: string = '';

  dateTime = new Date();

  loginForm = new FormGroup({
    montoExonerar: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/), // Solo números
      Validators.min(15000000), // Mínimo 15 millones
      Validators.max(30000000), // Máximo 30 millones
    ]),
  });

  getMontoExonerar() {
    return this.loginForm.get('montoExonerar')
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router
  ) { 
    this.dateTime.setDate(this.dateTime.getDate()); 
  }

  ngOnInit() {

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    if (this.rol == 'administrador' || this.rol == 'jefe') {
    } else {
      this.toast.warning({
        detail: 'ADVERTENCIA',
        summary: 'No tiene los permisos para acceder a este modulo',
        duration: 4000,
      });

      this.router.navigate(['/tramites']);
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

  onLogin() {
    this.markFormGroupTouched(this.loginForm);
    if (this.loginForm.valid) {
      console.log('valido');
    } else {
      console.log('Formulario inválido');
    }
  }

  enviar() {
    console.log('sdsd');
  }

  obtenerErrorCampoMonto() {
    const campo = this.loginForm.get('montoExonerar');

    if (campo?.hasError('required')) {
      return 'El monto es requerido';
    }

    if (campo?.hasError('pattern')) {
      return 'Ingrese solo números';
    }

    if (campo?.hasError('min')) {
      return 'El monto debe ser igual o mayor a 15 millones';
    }

    if (campo?.hasError('max')) {
      return 'El monto debe ser igual o menor a 30 millones';
    }

    return '';
  }

  errorBorderClass: string = 'error-border';

}
