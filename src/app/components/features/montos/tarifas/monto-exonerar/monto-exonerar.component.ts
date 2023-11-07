import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { MenuItem } from 'primeng/api';
import { tarifaService } from 'src/app/services/mantenimiento-services/tarifa-service';

@Component({
  selector: 'app-monto-exonerar',
  templateUrl: './monto-exonerar.component.html',
  styleUrls: ['./monto-exonerar.component.css'],
})
export class MontoExonerarComponent implements OnInit {
  public rol: string = '';
  public montoMaximoExonerarLista: any = [];
  public date = new Date();
  dateTime = new Date();
  formModal: any;
  public currentPage: number = 1; // Página actual
  public usersPerPage: number = 5; // Usuarios por página
  public filtro: string = '';
  public montoMaximoExonerarFiltrados: any;

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
    return this.montoExonerarForm.get('montoExonerar');
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
      this.tarifa.listarMontosExonerar().subscribe((res) => {
        this.montoMaximoExonerarLista = res;
        for (const element of this.montoMaximoExonerarLista) {
          element.fechaCreacion = this.formatDate(element.fechaCreacion);
          element.montoColones = this.formatNumber(element.montoColones);
        }

        this.montoMaximoExonerarLista.reverse();
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
          descripcion: 'TARIFA MONTO MAXIMO A EXONERAR',
        };

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

  //Paginacion
  changePage(page: number) {
    this.currentPage = page;
  }

  getPaginated() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.montoMaximoExonerarLista.slice(startIndex, endIndex);
  }

  getPaginationArray() {
    const totalUsers = this.montoMaximoExonerarLista.length; // Total de usuarios
    const totalPages = Math.ceil(totalUsers / this.usersPerPage); // Total de páginas
    return new Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  //Busqueda
  realizarBusqueda() {
    if (this.filtro) {
      this.montoMaximoExonerarFiltrados = this.montoMaximoExonerarLista.filter(
        (usuario) => this.matchesSearch(usuario)
      );
    } else {
      this.montoMaximoExonerarFiltrados = null; // Si no hay filtro, borra los resultados
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
