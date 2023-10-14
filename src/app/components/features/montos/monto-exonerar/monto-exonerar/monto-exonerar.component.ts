import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {YearPickerComponent} from 'src/app/components/dropdowns/year-picker/year-picker.component'

@Component({
  selector: 'app-monto-exonerar',
  templateUrl: './monto-exonerar.component.html',
  styleUrls: ['./monto-exonerar.component.css']
})
export class MontoExonerarComponent {
  public rol: string = '';
  value1: number = 0;
  dateTime = new Date();

  montoExonerarForm = new FormGroup({
    montoExonerar: new FormControl('', [
      Validators.required,
      Validators.min(15000000), // Mínimo 15 millones
      Validators.max(30000000), // Máximo 30 millones
    ]),
  });

  getMontoExonerar() {
    return this.montoExonerarForm.get('montoExonerar')
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

  onMontoExonerar() {
    this.markFormGroupTouched(this.montoExonerarForm);
    if (this.montoExonerarForm.valid) {
      console.log('valido');
    } else {
      console.log('Formulario inválido');
    }
  }

  enviar() {
    console.log(this.montoExonerarForm.value);
  }

  obtenerErrorCampoMonto() {
    const campo = this.montoExonerarForm.get('montoExonerar');

    if (campo?.hasError('required')) {
      return 'El monto es requerido';
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
