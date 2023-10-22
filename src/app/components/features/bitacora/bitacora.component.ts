import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { tarifaService } from 'src/app/services/mantenimiento-services/tarifa-service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
})
export class BitacoraComponent implements OnInit {
  public currentPage: number = 1; // Página actual
  public usersPerPage: number = 5; // Usuarios por página
  public rol: string = '';
  public filtro: string = '';
  public mantenimientos: any = [];
  public mantenimientosFiltrados: any;
  public date = new Date();

  constructor(
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private tarifa: tarifaService,
    private toast: NgToastService,
    private router: Router
  ) {}

  obtenerTarifas() {
    this.tarifa.obtenerTarifas().subscribe((val) => {
      this.mantenimientos = val;
      for (let i = 0; i < this.mantenimientos.length; i++) {
        this.mantenimientos[i].fechaCreacion = this.formatDate(
          this.mantenimientos[i].fechaCreacion
        ); 
        this.mantenimientos[i].montoColones = this.formatNumber(
          this.mantenimientos[i].montoColones
        ); 
      }
      this.mantenimientos.reverse();
    });
  }

  ngOnInit(): void {
    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });
    if (this.rol == 'Administrador' || this.rol == 'Jefe') {
      this.obtenerTarifas();
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

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // Utiliza formato de 12 horas
    };
    this.date = new Date(dateString);
    return this.date.toLocaleString('es-ES', options);
  }

  formatNumber(number: number): string {
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    };
    return new Intl.NumberFormat('es-ES', options).format(number);
  }

  //Paginacion
  changePage(page: number) {
    this.currentPage = page;
  }

  getPaginated() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.mantenimientos.slice(startIndex, endIndex);
  }

  getPaginationArray() {
    const totalUsers = this.mantenimientos.length; // Total de usuarios
    const totalPages = Math.ceil(totalUsers / this.usersPerPage); // Total de páginas
    return new Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  //Busqueda
  realizarBusqueda() {
    if (this.filtro) {
      this.mantenimientosFiltrados = this.mantenimientos.filter((usuario) =>
        this.matchesSearch(usuario)
      );
    } else {
      this.mantenimientosFiltrados = null; // Si no hay filtro, borra los resultados
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
