import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
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

  // Variable para almacenar la información del usuario seleccionado
  public usuarioSeleccionado: any;
  selectedRole: any;
  usuariosOriginales: any[];

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

    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
      this.usuariosOriginales = [...res]; // Almacena la lista original en otra propiedad
    });

    this.usuarioService.getNombreUsuario().subscribe((val) => {
      const nombreCompletoDelToken = this.auth.obtenerNombreDelToken();
      this.nombre = val || nombreCompletoDelToken;
    });

    if (this.rol == 'administrador') {
      this.api.obtenerUsuarios().subscribe((res) => {
        this.usuarios = res;
      });

      this.usuarioService.getCedulaUsuario().subscribe((val) => {
        const cedulaDelToken = this.auth.obtenerCedulaDelToken();
        this.cedula = val || cedulaDelToken;
      });
    } else {
      this.toast.warning({
        detail: 'ADVERTENCIA',
        summary: 'No tiene los permisos para acceder a este modulo',
        duration: 4000,
      });

      this.router.navigate(['/tramites']);
    }
  }

  filtroBusqueda: string = ''; // Término de búsqueda
  // Método para realizar la búsqueda
  realizarBusqueda() {
    const termino = this.filtroBusqueda.toLowerCase();

    function quitarTildes(texto) {
      // Para realizar búsqueda con o sin tildes, incluyendo la ñ
      return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    }

    if (termino === '') {
      this.usuarios = [...this.usuariosOriginales]; // Restaura la lista original
    } else {
      // Filtra la lista original en función del término de búsqueda
      this.usuarios = this.usuariosOriginales.filter((usuario: any) => {
        return (
          quitarTildes(usuario.nombre).includes(quitarTildes(termino)) ||
          quitarTildes(
            usuario.primerApellido + ' ' + usuario.segundoApellido
          ).includes(quitarTildes(termino)) ||
          quitarTildes(usuario.rol).includes(quitarTildes(termino)) ||
          quitarTildes(usuario.cedula).includes(
            quitarTildes(this.filtroBusqueda)
          )
        );
      });
    }
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

  // Método para abrir el modal y mostrar la información del usuario seleccionado
  // Aqui se edita la informacion de los usuarios, por medio del modal.
  mostrarInformacionUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.selectedRole = usuario.rol;
    const modalRef = this.modalService.open(ModalInformacionUsuarioComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.usuario = this.usuarioSeleccionado;
    modalRef.componentInstance.selectedRole = this.selectedRole; // Inicializa el rol en el modal
  }

  verInformacionUsuario(usuario: any){
    this.usuarioSeleccionado = usuario;
    const modalRef = this.modalService.open(ModalVerInformacionUsuarioComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.usuario = this.usuarioSeleccionado;
  }
}
