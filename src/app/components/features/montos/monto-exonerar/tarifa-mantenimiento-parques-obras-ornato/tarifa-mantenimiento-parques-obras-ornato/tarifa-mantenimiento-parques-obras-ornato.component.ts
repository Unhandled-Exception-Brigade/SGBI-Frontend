import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {YearPickerComponent} from 'src/app/components/dropdowns/year-picker/year-picker.component'
import { tarifaService } from 'src/app/services/mantenimiento-services/tarifa-service'

@Component({
  selector: 'app-tarifa-mantenimiento-parques-obras-ornato',
  templateUrl: './tarifa-mantenimiento-parques-obras-ornato.component.html',
  styleUrls: ['./tarifa-mantenimiento-parques-obras-ornato.component.css']
})
export class TarifaMantenimientoParquesObrasOrnatoComponent {
  public rol: string = '';
  value1: number = 0;
  dateTime = new Date();
  public montoMantenimiento: any = [];
  @ViewChild('closebutton') closebutton;
  @ViewChild('saveButton') saveButton: ElementRef;

  tarifaParquesObrasOrnatoForm = new FormGroup({
    tarifaParquesObrasOrnato: new FormControl('', [
      Validators.required,
      Validators.min(100), // Mínimo 15 millones
      Validators.max(900), // Máximo 30 millones
    ]),
  });

  getTarifaParquesObrasOrnato() {
    return this.tarifaParquesObrasOrnatoForm.get('tarifaParquesObrasOrnato')
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router,
    private tarifa: tarifaService
  ) {
    this.dateTime.setDate(this.dateTime.getDate());
  }

  ngOnInit() {

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    if (this.rol == 'Administrador' || this.rol == 'Jefe') {

      this.tarifa.listarMantenimiento().subscribe((res) => {
        this.montoMantenimiento = res;
      });

    }

    if (this.rol == 'Administrador' || this.rol == 'Jefe') {
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

  onTarifaParquesObrasOrnato() {
    this.markFormGroupTouched(this.tarifaParquesObrasOrnatoForm);
    if (this.tarifaParquesObrasOrnatoForm.valid) {
      console.log('valido');
    } else {
      console.log('Formulario inválido');
    }
  }

  enviar() {
    if (this.saveButton) {
      this.markFormGroupTouched(this.tarifaParquesObrasOrnatoForm);
      if (this.tarifaParquesObrasOrnatoForm.valid) {
        const requestData = {
          montoColones: this.tarifaParquesObrasOrnatoForm.value.tarifaParquesObrasOrnato,
          descripcion: 'TARIFA MANTENIMIENTO DE PARQUES Y OBRAS DE ORNATO'
        };
        console.log(requestData);
        this.tarifa.registrarTarifa(requestData).subscribe({
          next: (res) => {
            this.tarifaParquesObrasOrnatoForm.reset();
            this.toast.success({
              detail: 'CORRECTO',
              summary: res.message,
              duration: 4000,
            });
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
      this.closebutton.nativeElement.click();
    }
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // Utiliza formato de 12 horas
    };
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', options);
  }

  formatNumber(number: number): string {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2, 
    };
    return new Intl.NumberFormat('es-ES', options).format(number);
  }

  obtenerErrorCampoMonto() {
    const campo = this.tarifaParquesObrasOrnatoForm.get('tarifaParquesObrasOrnato');

    if (campo?.hasError('required')) {
      return 'El monto es requerido';
    }

    if (campo?.hasError('min')) {
      return 'El monto debe ser igual o mayor a ₡100,00';
    }

    if (campo?.hasError('max')) {
      return 'El monto debe ser igual o menor a ₡900,00';
    }

    return '';
  }

  errorBorderClass: string = 'error-border';
}
