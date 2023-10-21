import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioService } from 'src/app/services/editar-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-informacion-usuario',
  templateUrl: './modal-informacion-usuario.component.html',
  styleUrls: ['./modal-informacion-usuario.component.css'],
})
export class ModalInformacionUsuarioComponent {
  @Input() usuario: any;
  public usuarios: any = [];
  public rol: string = '';
  selectedRole: string;
  estadoSeleccionado: string;

  public usuarioEditado: any; // Copia del usuario para edición
  public nombreEditado: string;
  public primerApellidoEditado: string;
  public segundoApellidoEditado: string;
  public correoEditado: string;

  constructor(
    public activeModal: NgbActiveModal,
    private editarUsuarioService: EditarUsuarioService,
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuarioEditado = { ...this.usuario };
    // Inicializa el campo de las variables editas con el valor actual
    this.nombreEditado = this.usuario.nombre;
    this.primerApellidoEditado = this.usuario.primerApellido;
    this.segundoApellidoEditado = this.usuario.segundoApellido;
    this.correoEditado = this.usuario.correo;

    this.selectedRole = this.usuario.rol; // Inicializa el valor de selectedRole con el rol del usuario.
    this.estadoSeleccionado = this.usuario.estaInactivo;

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });
  }

  closeModal() {
    this.activeModal.close();
    this.recargarPagina();
  }

  recargarPagina() {
    window.location.reload();
  }

  cambiarRol(nuevoRol: string) {
    this.selectedRole = nuevoRol;
  }

  cambiarEstado(nuevoEstado: string) {
    this.estadoSeleccionado = nuevoEstado;
  }

  nombreValido: boolean = true;
  primerApellidoValido: boolean = true;
  segundoApellidoValido: boolean = true;

  mensajeErrorNombre: string = '';
  mensajeErrorPrimerApellido: string = '';
  mensajeErrorSegundoApellido: string = '';

  validarNombre_Apellidos() {
    const nombre = this.usuario.nombre;
    const primerApellido = this.usuario.primerApellido;
    const segundoApellido = this.usuario.segundoApellido;

    // Expresión regular que permite letras, tildes y la letra "ñ".
    const patron = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!patron.test(nombre)) {
      this.nombreValido = false;
      this.mensajeErrorNombre = 'El nombre solo debe contener letras y tildes.';
    } else {
      this.nombreValido = true;
      this.mensajeErrorNombre = '';
    }

    if (!patron.test(primerApellido)) {
      this.primerApellidoValido = false;
      this.mensajeErrorPrimerApellido =
        'El primer apellido solo debe contener letras y tildes.';
    } else {
      this.primerApellidoValido = true;
      this.mensajeErrorPrimerApellido = '';
    }

    if (!patron.test(segundoApellido)) {
      this.segundoApellidoValido = false;
      this.mensajeErrorSegundoApellido =
        'El segundo apellido solo debe contener letras y tildes.';
    } else {
      this.segundoApellidoValido = true;
      this.mensajeErrorSegundoApellido = '';
    }
  }

  correoValido: boolean = true;
  mensajeErrorCorreo: string = '';

  validarCorreo() {
    const correo = this.usuario.correo;

    // Expresión regular para validar un formato de correo electrónico válido.
    const patronCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!patronCorreo.test(correo)) {
      this.correoValido = false;
      this.mensajeErrorCorreo =
        'El correo electrónico no tiene un formato válido.';
    } else {
      this.correoValido = true;
      this.mensajeErrorCorreo = '';
    }
  }

  // Método para aplicar cambios al campo Nombre
  aplicarCambiosNombre() {
    this.usuarioEditado.nombre = this.nombreEditado;
  }

  aplicarCambiosPrimerApellido() {
    this.usuarioEditado.primerApellido = this.primerApellidoEditado;
  }

  aplicarCambiosSegundoApellido() {
    this.usuarioEditado.segundoApellido = this.segundoApellidoEditado;
  }

  aplicarCambiosCorreo() {
    this.usuarioEditado.correo = this.correoEditado;
  }

  guardarCambios() {
    // Aplica los cambios al usuario original
    this.usuario.nombre = this.usuarioEditado.nombre;
    this.usuario.primerApellido = this.usuarioEditado.primerApellido;
    this.usuario.segundoApellido = this.usuarioEditado.segundoApellido;
    this.usuario.correo = this.usuarioEditado.correo;
    this.usuario.rol = this.selectedRole;
    this.usuario.estaInactivo = this.estadoSeleccionado;

    this.editarUsuarioService.actualizarUsuario(this.usuario).subscribe(
      (res) => {
        this.closeModal();
      },
      (error) => {
        console.error('Error al actualizar usuario', error);
      }
    );
  }
}
