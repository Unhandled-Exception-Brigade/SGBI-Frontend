import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { tarifaService } from 'src/app/services/mantenimiento-services/tarifa-service'

@Component({
  selector: 'app-monto-exonerar',
  templateUrl: './monto-exonerar.component.html',
  styleUrls: ['./monto-exonerar.component.css']
})
export class MontoExonerarComponent implements OnInit {
  public rol: string = '';
  public montoMaximoExonerarLista: any = [];

  dateTime = new Date();
  formModal: any
  @ViewChild('closebutton') closebutton;
  @ViewChild('saveButton') saveButton: ElementRef;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

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
    private router: Router,
    private tarifa: tarifaService
  ) {
    this.dateTime.setDate(this.dateTime.getDate());
  }

  obtenerTarifas(){
    if (this.rol == 'Administrador' || this.rol == 'Jefe') {
      this.tarifa.listarMontosExonerar().subscribe((res) => {
        this.montoMaximoExonerarLista = res;
      });
    }
  }

  ngOnInit() {

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
      console.log('Rol en mantenimiento '+this.rol);
    });

    this.obtenerTarifas();
    this.montoMaximoExonerarLista.reverse();

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

  onMontoExonerar() {
    this.markFormGroupTouched(this.montoExonerarForm);
    if (this.montoExonerarForm.valid) {
      console.log('valido');
    } else {
      console.log('Formulario inválido');
    }
  }

  enviar() {
    
    if (this.saveButton) {
      this.markFormGroupTouched(this.montoExonerarForm);
      if (this.montoExonerarForm.valid) {
        const requestData = {
          montoColones: this.montoExonerarForm.value.montoExonerar,
          descripcion: 'TARIFA MONTO MAXIMO A EXONERAR'
        };
        console.log(requestData);
        this.tarifa.registrarTarifa(requestData).subscribe({
          next: (res) => {
            this.montoExonerarForm.reset();
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
      minimumFractionDigits: 3,
      maximumFractionDigits: 3, 
    };
    return new Intl.NumberFormat('es-ES', options).format(number);
  }
  

  obtenerErrorCampoMonto() {
    const campo = this.montoExonerarForm.get('montoExonerar');

    if (campo?.hasError('required')) {
      return 'El monto es requerido';
    }

    if (campo?.hasError('min')) {
      return 'El monto debe ser igual o mayor a ₡15 000 000,000';
    }

    if (campo?.hasError('max')) {
      return 'El monto debe ser igual o menor ₡30.000.000,000';
    }
    return '';
  }
  errorBorderClass: string = 'error-border';
}
