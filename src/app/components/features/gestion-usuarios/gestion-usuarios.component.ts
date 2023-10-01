import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoDropdownComponent } from 'src/app/components/dropdowns/estado-dropdown/estado-dropdown.component';
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
  public estado: string = '';

  public cedula: string = '';
  public rol: string = '';

  usuariosPorPagina: number = 10; // Número de usuarios por página
  paginaActual: number = 1; // Página actual

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
    });

    this.usuarioService.getCedulaUsuario().subscribe((val) => {
      const cedulaDelToken = this.auth.obtenerCedulaDelToken();
      this.cedula = val || cedulaDelToken;
    });

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    this
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

  // -----------------Alteracion de Usuarios----------------------------
  updateUserRole(newRole: string, usuario: any) {
    usuario.rol = newRole;
  }

  updateUserEstado(nuevoEstado: boolean, usuario: any) {
    usuario.estaInactivo = nuevoEstado;
  }

  actualizarEstado(nuevoEstado: string, usuario: any) {
    usuario.estaInactivo = nuevoEstado;
  }

  public usuariosEditables: any = []; // Un array para mantener usuarios en modo de edición
  public usuariosEnEdicion: Set<number> = new Set<number>(); // Conjunto de IDs de usuarios en modo de edición
  public usuarioEnEdicionId: number | null = null; // ID del usuario actualmente en edición
  public usuarioEnEdicion: any | null = null; // Usuario actualmente en edición, inicializado como null

  estadoSeleccionado: string;

  editarUsuario(usuario: any) {
    // Validar el correo electrónico actual antes de iniciar la edición
    const correoActualValido = this.validarCorreo(usuario.correo);
    const nombreActualValido = this.validarNombre(usuario.nombre);
    const apellidoActualValido = this.validarApellido(usuario.apellido);
    const cedulaActualValida = this.validarCedula(usuario.cedula);

    // Asigna el estado actual del usuario a estadoSeleccionado
    this.estadoSeleccionado = usuario.estaInactivo ? 'inactivo' : 'activo';

    if (correoActualValido) {
      // El correo actual es válido, ahora se puede iniciar la edición
      this.usuarioEnEdicion = usuario;
    } else {
      console.log('El correo actual no es válido. No se puede editar.');
    }

    if (nombreActualValido) {
      this.usuarioEnEdicion = usuario;
    } else {
      console.log('El nombre actual no es válido. No se puede editar.');
    }

    if (apellidoActualValido) {
      this.usuarioEnEdicion = usuario;
    } else {
      console.log('El apellido actual no es válido. No se puede editar.');
    }

    if (cedulaActualValida) {
      // La cédula actual es válida, ahora se puede iniciar la edición
      this.usuarioEnEdicion = usuario;
    } else {
      console.log('La cédula actual no es válida. No se puede editar.');
    }
  } // fin editarUsuario()

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
            summary: err.error,
            duration: 4000,
          });

          //aca se recarga la pagina
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/gestionUsuarios']);
            });
        },
      });
  }

  cancelarEdicion() {
    // Salir del modo de edición sin guardar cambios
    this.usuarioEnEdicion = null;
    //aca se recarga la pagina
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/gestionUsuarios']);
    });
  }

  estaEditando(usuario: any) {
    // Comprueba si el usuario actual está en modo de edición
    return this.usuarioEnEdicion === usuario;
  }

  // CUADRO DE BUSQUEDA EN LA TABLA DE USUARIOS //
  filtroBusqueda: string = ''; // Término de búsqueda

  // Método para realizar la búsqueda
  realizarBusqueda() {
    if (this.filtroBusqueda.trim() === '') {
      // Si el cuadro de búsqueda está vacío, muestra la lista completa de usuarios
      this.api.obtenerUsuarios().subscribe((res) => {
        this.usuarios = res;
      });
    } else {
      // Si hay un término de búsqueda, filtra la lista de usuarios
      this.api.obtenerUsuarios().subscribe((res) => {
        this.usuarios = res.filter((usuario: any) => {
          const termino = this.filtroBusqueda.toLowerCase();
          return (
            usuario.nombre.toLowerCase().includes(termino) ||
            usuario.apellido.toLowerCase().includes(termino) ||
            usuario.cedula.includes(this.filtroBusqueda)
          );
        });
      });
    }
  } // fin realizarBusqueda()

  validarCedula(cedula: string): {
    cedulaValida: boolean;
    mensaje: string;
    caracterEspecial: boolean;
  } {
    const regex = /^[0-9a-zA-Z]*$/;
    const cedulaValida = regex.test(cedula);

    // Verificar si la cédula está vacía
    if (cedula.trim() === '') {
      return {
        cedulaValida: false,
        mensaje: 'La cédula no puede estar vacía.',
        caracterEspecial: false,
      };
    }

    // Verificar longitud mínima y máxima
    if (cedula.length < 9 || cedula.length > 9) {
      return {
        cedulaValida: false,
        mensaje: 'La cédula debe tener exactamente 9 caracteres.',
        caracterEspecial: false,
      };
    }

    // Verificar si se encontró un carácter especial
    const caracterEspecial =
      !cedulaValida && /[!@#$%^&*(),.?":{}|<>]/.test(cedula);

    // Definir el mensaje según la validación
    let mensaje = '';
    if (!cedulaValida) {
      mensaje = 'Cédula no válida.';
    }
    if (caracterEspecial) {
      mensaje = 'No se permiten caracteres especiales.';
    }

    return { cedulaValida, mensaje, caracterEspecial };
  } // fin validarCedula()

  validarEntrada(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const regex = /^[0-9a-zA-Z]*$/;

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  validarNombre(nombre: string): {
    nombreValido: boolean;
    mensaje: string;
    caracterEspecial: boolean;
    contieneNumeros: boolean;
  } {
    // Expresión regular para validar que solo contenga letras (mayúsculas y minúsculas)
    const regex = /^[a-zA-Z]+$/;

    // Validar el nombre con la expresión regular
    const nombreValido = regex.test(nombre);

    // Verificar si se encontró un carácter especial
    const caracterEspecial =
      !nombreValido && /[!@#$%^&*(),.?":{}|<>]/.test(nombre);

    // Verificar si el nombre contiene números
    const contieneNumeros = /[0-9]/.test(nombre);

    // Definir el mensaje según la validación
    let mensaje = '';
    if (!nombreValido) {
      mensaje = 'Nombre no válido.';
    }
    if (caracterEspecial) {
      mensaje = 'No se permiten caracteres especiales.';
    }
    if (contieneNumeros) {
      mensaje = 'No se permiten números.';
    }

    if (caracterEspecial && contieneNumeros) {
      mensaje = 'No se permiten caracteres especiales ni números.';
    }

    return { nombreValido, mensaje, caracterEspecial, contieneNumeros };
  } // fin validarNombre()

  validarApellido(apellido: string): {
    apellidoValido: boolean;
    mensaje: string;
    caracterEspecial: boolean;
    contieneNumeros: boolean;
  } {
    const regex = /^[a-zA-Z]+$/;

    // Validar el apellido con la expresión regular
    const apellidoValido = regex.test(apellido);

    // Verificar si se encontró un carácter especial
    const caracterEspecial =
      !apellidoValido && /[!@#$%^&*(),.?":{}|<>]/.test(apellido);

    // Verificar si el apellido contiene números
    const contieneNumeros = /[0-9]/.test(apellido);

    // Definir el mensaje según la validación
    let mensaje = '';
    if (!apellidoValido) {
      mensaje = 'Apellido no válido.';
    }
    if (caracterEspecial) {
      mensaje = 'No se permiten caracteres especiales.';
    }
    if (contieneNumeros) {
      mensaje = 'No se permiten números.';
    }

    if (caracterEspecial && contieneNumeros) {
      mensaje = 'No se permiten caracteres especiales ni números.';
    }

    return { apellidoValido, mensaje, caracterEspecial, contieneNumeros };
  } // fin validarApellido()

  // Validar correo
  correoValido: boolean = false; // Variable de bandera para validar el correo electrónico
  validarCorreo(correo: string): boolean {
    // Expresión regular para validar el formato de un correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Validar el correo con la expresión regular
    return regex.test(correo);
  }
} // fin GestionUsuariosComponent
