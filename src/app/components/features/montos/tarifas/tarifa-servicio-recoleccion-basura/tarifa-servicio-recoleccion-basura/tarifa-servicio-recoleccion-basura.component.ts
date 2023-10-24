import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { YearPickerComponent } from 'src/app/components/dropdowns/year-picker/year-picker.component';
import { tarifaService } from 'src/app/services/mantenimiento-services/tarifa-service';

@Component({
  selector: 'app-tarifa-servicio-recoleccion-basura',
  templateUrl: './tarifa-servicio-recoleccion-basura.component.html',
  styleUrls: ['./tarifa-servicio-recoleccion-basura.component.css'],
})
export class TarifaServicioRecoleccionBasuraComponent {
  public rol: string = '';
  value1: number = 0;
  dateTime = new Date();
  public currentPage: number = 1; // Página actual
  public usersPerPage: number = 5; // Usuarios por página
  public filtro: string = '';
  public tarifaRecoleccionBasuraList: any = [];
  public tarifaRecoleccionBasuraFiltrados: any;

  @ViewChild('closebutton') closebutton;
  @ViewChild('saveButton') saveButton: ElementRef;

  tarifaRecoleccionBasuraForm = new FormGroup({
    tarifaRecoleccionBasura: new FormControl('', [
      Validators.required,
      Validators.min(7000), // Mínimo 15 millones
      Validators.max(20000), // Máximo 30 millones
    ]),
  });

  getTarifaParquesObrasOrnato() {
    return this.tarifaRecoleccionBasuraForm.get('tarifaRecoleccionBasura');
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

  obtenerTarifas() {
    if (this.rol == 'Administrador' || this.rol == 'Jefe') {
      this.tarifa.listarServiciosBasura().subscribe((res) => {
        this.tarifaRecoleccionBasuraList = res;

        for (const element of this.tarifaRecoleccionBasuraList) {
          element.fechaCreacion = this.formatDate(element.fechaCreacion);
          element.montoColones = this.formatNumber(element.montoColones);
        }

        this.tarifaRecoleccionBasuraList.reverse();
      });
    }
  }

  ngOnInit() {
    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    if (this.rol == 'Administrador' || this.rol == 'Jefe') {
      this.obtenerTarifas();
    } else {
      this.toast.warning({
        detail: 'ADVERTENCIA',
        summary: 'No tiene los permisos para acceder a este modulo',
        duration: 4000,
      });

      this.router.navigate(['/tramites']);
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onTarifaRecoleccionBasura() {
    this.markFormGroupTouched(this.tarifaRecoleccionBasuraForm);
    if (this.tarifaRecoleccionBasuraForm.valid) {
      console.log('valido');
    } else {
      console.log('Formulario inválido');
    }
  }

  enviar() {
    if (this.saveButton) {
      this.markFormGroupTouched(this.tarifaRecoleccionBasuraForm);
      if (this.tarifaRecoleccionBasuraForm.valid) {
        const requestData = {
          montoColones:
            this.tarifaRecoleccionBasuraForm.value.tarifaRecoleccionBasura,
          descripcion: 'TARIFA SERVICIOS DE RECOLECCION DE BASURA',
        };
        console.log(requestData);
        this.tarifa.registrarTarifa(requestData).subscribe({
          next: (res) => {
            this.tarifaRecoleccionBasuraForm.reset();
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

  obtenerErrorCampoMonto() {
    const campo = this.tarifaRecoleccionBasuraForm.get(
      'tarifaRecoleccionBasura'
    );

    if (campo?.hasError('required')) {
      return 'El monto es requerido';
    }

    if (campo?.hasError('min')) {
      return 'El monto debe ser igual o mayor a ₡7 000,00';
    }

    if (campo?.hasError('max')) {
      return 'El monto debe ser igual o menor a ₡20 000,00';
    }

    return '';
  }

  errorBorderClass: string = 'error-border';

  //Paginacion
  changePage(page: number) {
    this.currentPage = page;
  }

  getPaginated() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.tarifaRecoleccionBasuraList.slice(startIndex, endIndex);
  }

  getPaginationArray() {
    const totalUsers = this.tarifaRecoleccionBasuraList.length; // Total de usuarios
    const totalPages = Math.ceil(totalUsers / this.usersPerPage); // Total de páginas
    return new Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  //Busqueda
  realizarBusqueda() {
    if (this.filtro) {
      this.tarifaRecoleccionBasuraFiltrados =
        this.tarifaRecoleccionBasuraList.filter((usuario) =>
          this.matchesSearch(usuario)
        );
    } else {
      this.tarifaRecoleccionBasuraFiltrados = null; // Si no hay filtro, borra los resultados
    }
  }

  matchesSearch(elemento: any) {
    const lowerCaseFiltro = this.filtro.toLowerCase();
    const palabrasClave = lowerCaseFiltro.split(' '); // Dividir el filtro en palabras clave
    return palabrasClave.every((palabra) =>
      // Verificar si alguna parte del usuario coincide con la palabra clave
      JSON.stringify(elemento).toLowerCase().includes(palabra)
    );
  }
}
