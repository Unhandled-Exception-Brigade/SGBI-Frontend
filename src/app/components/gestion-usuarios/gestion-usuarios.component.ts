import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoDropdownComponent } from 'src/app/components/estado-dropdown/estado-dropdown.component';
import { actualizarUsuario } from 'src/app/models/actualizar-usuario';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { EditarUsuarioService } from 'src/app/services/editar-usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent {
  public usuarios: any = [];
  actualizarUsuarioObj = new actualizarUsuario();

  public nombreCompleto: string = '';
  public rol: string = '';
  public estado: string = '';

  usuariosPorPagina: number = 10; // Número de usuarios por página
  paginaActual: number = 1; // Página actual
  ordenAscendente: boolean = true; // Variable para controlar el orden ascendente o descendente
  columnaOrden: string = ''; // Variable para almacenar la columna por la que se está ordenando

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private toast: NgToastService,
    private router: Router,
    private editarUsuarioService: EditarUsuarioService
  ) {}

  ngOnInit() {
    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
      this.cargarEstadoOrden(); // Cargar el estado del orden al cargar la página
      this.ordenarUsuarios(); // Ordenar los usuarios después de cargar los datos y el estado
    });

    this.usuarioService.getNombreUsuario().subscribe((val) => {
      const nombreCompletoDelToken = this.auth.obtenerNombreDelToken();
      this.nombreCompleto = val || nombreCompletoDelToken;
    });

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

  // Método para cambiar de página
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  calcularPaginas(): number[] {
    const totalPaginas = Math.ceil(
      this.usuarios.length / this.usuariosPorPagina
    );
    return Array(totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
  }

  // Método para ordenar la matriz de usuarios
  ordenarUsuarios() {
    this.usuarios.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();
      return this.ordenAscendente
        ? nombreA.localeCompare(nombreB)
        : nombreB.localeCompare(nombreA);
    });
  }

  cargarEstadoOrden() {
    // Recupera el estado de orden y columna desde localStorage
    const estadoOrden = localStorage.getItem('ordenAscendente');
    const columnaOrden = localStorage.getItem('columnaOrden');

    if (estadoOrden !== null && columnaOrden !== null) {
      this.ordenAscendente = estadoOrden === 'true'; // Convierte el string en boolean
      this.columnaOrden = columnaOrden;
    }
  }

  guardarEstadoOrden() {
    // // Guarda el estado de orden y columna en localStorage
    // localStorage.setItem('ordenAscendente', this.ordenAscendente.toString());
    // localStorage.setItem('columnaOrden', this.columnaOrden);
  }

  // Método para cambiar el orden de la tabla
  cambiarOrden(columna: string) {
    if (this.columnaOrden === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.columnaOrden = columna;
      this.ordenAscendente = true;
    }

    this.guardarEstadoOrden();
    this.ordenarUsuarios(); // Volver a ordenar cuando se cambie el orden
  }

  updateUserRole(newRole: string, usuario: any) {
    usuario.rol = newRole;
  }

  updateUserEstado(nuevoEstado: boolean, usuario: any){
    usuario.estaInactivo = nuevoEstado;
    console.log(nuevoEstado);
  }

  public usuariosEditables: any = []; // Un array para mantener usuarios en modo de edición
  public usuariosEnEdicion: Set<number> = new Set<number>(); // Conjunto de IDs de usuarios en modo de edición
  public usuarioEnEdicionId: number | null = null; // ID del usuario actualmente en edición
  public usuarioEnEdicion: any | null = null; // Usuario actualmente en edición, inicializado como null

  editarUsuario(usuario: any) {
    this.usuarioEnEdicion = usuario; // Asigna el usuario seleccionado a usuarioEnEdicion
  }

  guardarCambios() {
    this.actualizarUsuarioObj.nombre = this.usuarioEnEdicion.nombre;
    this.actualizarUsuarioObj.apellido = this.usuarioEnEdicion.apellido;
    this.actualizarUsuarioObj.cedula = this.usuarioEnEdicion.cedula;
    this.actualizarUsuarioObj.correo = this.usuarioEnEdicion.correo;
    this.actualizarUsuarioObj.rol = this.usuarioEnEdicion.rol;
    this.actualizarUsuarioObj.estaInactivo = this.usuarioEnEdicion.estaInactivo;

    this.editarUsuarioService
      .actualizarUsuario(this.actualizarUsuarioObj)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'CORRECTO',
            summary: 'Usuario actualizado',
            duration: 4000,
          });
          this.usuarioEnEdicion = null;
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'No se pudo actualizar el usuario',
            duration: 4000,
          });
        },
      });
  }

  cancelarEdicion() {
    // Salir del modo de edición sin guardar cambios
    this.usuarioEnEdicion = null;
  }

  estaEditando(usuario: any) {
    // Comprueba si el usuario actual está en modo de edición
    return this.usuarioEnEdicion === usuario;
  }
}
