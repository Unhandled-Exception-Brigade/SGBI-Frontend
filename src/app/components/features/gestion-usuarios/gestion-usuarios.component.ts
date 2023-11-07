import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { EditarUsuarioService } from 'src/app/services/editar-usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInformacionUsuarioComponent } from '../../modal-informacion-usuario/modal-informacion-usuario.component';
import { ModalVerInformacionUsuarioComponent } from '../../modal-ver-informacion-usuario/modal-ver-informacion-usuario.component';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent {
  public usuarios: any = [];
  public nombre: string = '';
  public cedula: string = '';
  public rol: string = '';
  public filtro: string = '';

  public currentPage: number = 1; // Página actual
  public usersPerPage: number = 10; // Usuarios por página

  // Variable para almacenar la información del usuario seleccionado
  public usuarioSeleccionado: any;
  selectedRole: any;
  usuariosOriginales: any[];
  usuariosFiltrados: any;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private toast: NgToastService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    if (this.rol == 'Administrador') {
      this.usuarioService.getNombreUsuario().subscribe((val) => {
        const nombreCompletoDelToken = this.auth.obtenerNombreDelToken();
        this.nombre = val || nombreCompletoDelToken;
      });

      this.usuarioService.getCedulaUsuario().subscribe((val) => {
        const cedulaDelToken = this.auth.obtenerCedulaDelToken();
        this.cedula = val || cedulaDelToken;
      });

      this.llenarTabla();
    } else {
      this.toast.warning({
        detail: 'ADVERTENCIA',
        summary: 'No tiene los permisos para acceder a este modulo',
        duration: 4000,
      });

      this.router.navigate(['/tramites']);
    }
  }

  // Busqueda de usuarios
  realizarBusqueda() {
    if (this.filtro) {
      this.usuariosFiltrados = this.usuarios.filter((usuario) =>
        this.matchesSearch(usuario)
      );
    } else {
      this.usuariosFiltrados = null; // Si no hay filtro, borra los resultados
    }
  }

  llenarTabla() {
    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
      this.usuariosOriginales = [...res]; // Almacena la lista original en otra propiedad
    });
  }

  matchesSearch(usuario: any) {
    const lowerCaseFiltro = this.filtro.toLowerCase();
    const palabrasClave = lowerCaseFiltro.split(' '); // Dividir el filtro en palabras clave
    return palabrasClave.every(
      (palabra) =>
        // Verificar si alguna parte del usuario coincide con la palabra clave
        JSON.stringify(usuario).toLowerCase().includes(palabra) ||
        usuario.nombre.toLowerCase().includes(palabra) ||
        usuario.primerApellido.toLowerCase().includes(palabra) ||
        (usuario.segundoApellido &&
          usuario.segundoApellido.toLowerCase().includes(palabra))
    );
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

  // Paginacion
  changePage(page: number) {
    this.currentPage = page;
  }

  getPaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.usuarios.slice(startIndex, endIndex);
  }

  getPaginationArray() {
    const totalUsers = this.usuarios.length; // Total de usuarios
    const totalPages = Math.ceil(totalUsers / this.usersPerPage); // Total de páginas
    return new Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Método para abrir el modal y mostrar la información del usuario seleccionado
  // Aqui se edita la informacion de los usuarios, por medio del modal.
  mostrarInformacionUsuario(usuario: any) {
    this.llenarTabla();

    this.usuarioSeleccionado = usuario;
    this.selectedRole = usuario.rol;
    const modalRef = this.modalService.open(ModalInformacionUsuarioComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.usuario = this.usuarioSeleccionado;
    modalRef.componentInstance.selectedRole = this.selectedRole; // Inicializa el rol en el modal
  }

  verInformacionUsuario(usuario: any) {
    this.llenarTabla();

    this.usuarioSeleccionado = usuario;
    const modalRef = this.modalService.open(
      ModalVerInformacionUsuarioComponent,
      {
        size: 'lg',
      }
    );
    modalRef.componentInstance.usuario = this.usuarioSeleccionado;
  }
}
