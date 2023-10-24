import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioService } from 'src/app/services/editar-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';

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

  public nombreValido: boolean = true;
  public primerApellidoValido: boolean = true;
  public segundoApellidoValido: boolean = true;
  public correoValido: boolean = true;

  public mensajeErrorNombre: string = '';
  public mensajeErrorPrimerApellido: string = '';
  public mensajeErrorSegundoApellido: string = '';
  public mensajeErrorCorreo: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private editarUsuarioService: EditarUsuarioService,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.usuarioEditado = { ...this.usuario };
    // Inicializa el campo de las variables editas con el valor actual
    this.nombreEditado = this.usuario.nombre;
    this.primerApellidoEditado = this.usuario.primerApellido;
    this.segundoApellidoEditado = this.usuario.segundoApellido;
    this.correoEditado = this.usuario.email;

    this.selectedRole = this.usuario.rol; // Inicializa el valor de selectedRole con el rol del usuario.
    this.estadoSeleccionado = this.usuario.activo;

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });
  }

  closeModal() {
    this.activeModal.close();
    // this.recargarPagina();
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

  validarNombre_Apellidos() {
    let errorMensajeNombre = '';
    let errorMensajePrimerApellido = '';
    let errorMensajeSegundoApellido = '';

    if (!/^[A-ZÑ][a-zñ]*$/.test(this.nombreEditado)) {
      if (!/^[A-ZÑ]/.test(this.nombreEditado)) {
        errorMensajeNombre = 'La primera letra debe ser en mayúscula.';
      } else if (/\d/.test(this.nombreEditado)) {
        errorMensajeNombre = 'No se permiten números en el nombre.';
      } else if (/\s/.test(this.nombreEditado)) {
        errorMensajeNombre = 'No se permiten espacios en blanco en el nombre.';
      } else if (/[áéíóúÁÉÍÓÚ]/.test(this.nombreEditado)) {
        errorMensajeNombre = 'No se permiten tildes en el nombre.';
      } else {
        errorMensajeNombre = 'No se permiten caracteres especiales.';
      }
    }

    if (!/^[A-ZÑ][a-zñ]*$/.test(this.primerApellidoEditado)) {
      if (!/^[A-ZÑ]/.test(this.primerApellidoEditado)) {
        errorMensajePrimerApellido = 'La primera letra debe ser en mayúscula.';
      } else if (/\d/.test(this.primerApellidoEditado)) {
        errorMensajePrimerApellido =
          'No se permiten números en el primer apellido.';
      } else if (/\s/.test(this.primerApellidoEditado)) {
        errorMensajePrimerApellido =
          'No se permiten espacios en blanco en el primer apellido.';
      } else if (/[áéíóúÁÉÍÓÚ]/.test(this.primerApellidoEditado)) {
        errorMensajePrimerApellido =
          'No se permiten tildes en el primer apellido.';
      } else {
        errorMensajePrimerApellido = 'No se permiten caracteres especiales.';
      }
    }

    if (!/^[A-ZÑ][a-zñ]*$/.test(this.segundoApellidoEditado)) {
      if (!/^[A-ZÑ]/.test(this.segundoApellidoEditado)) {
        errorMensajeSegundoApellido = 'La primera letra debe ser en mayúscula.';
      } else if (/\d/.test(this.segundoApellidoEditado)) {
        errorMensajeSegundoApellido =
          'No se permiten números en el segundo apellido.';
      } else if (/\s/.test(this.segundoApellidoEditado)) {
        errorMensajeSegundoApellido =
          'No se permiten espacios en blanco en el segundo apellido.';
      } else if (/[áéíóúÁÉÍÓÚ]/.test(this.segundoApellidoEditado)) {
        errorMensajeSegundoApellido =
          'No se permiten tildes en el segundo apellido.';
      } else {
        errorMensajeSegundoApellido = 'No se permiten caracteres especiales.';
      }
    }

    this.mensajeErrorNombre = errorMensajeNombre;
    this.mensajeErrorPrimerApellido = errorMensajePrimerApellido;
    this.mensajeErrorSegundoApellido = errorMensajeSegundoApellido;

    this.nombreValido = errorMensajeNombre === '';
    this.primerApellidoValido = errorMensajePrimerApellido === '';
    this.segundoApellidoValido = errorMensajeSegundoApellido === '';
  }

  validarCorreo() {
    // Expresión regular para validar un formato de correo electrónico válido.
    const patronCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    // Valida el campo "Correo"
    if (!patronCorreo.test(this.correoEditado)) {
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
    this.usuarioEditado.email = this.correoEditado;
  }

  mostrarDialogoConfirmacion() {
    const modalRef = this.modalService.open(ModalConfirmacionComponent, {
      centered: true,
    });

    modalRef.componentInstance.mensaje =
      '¿Estás seguro de que deseas guardar los cambios?';

    modalRef.result.then(
      (result) => {
        if (result === 'confirmado') {
          // El usuario confirmó, procede a guardar los cambios
          this.guardarCambios();
        }
      },
      (reason) => {
        // El usuario canceló el cuadro de diálogo, no hagas nada
      }
    );
  }

  guardarCambiosConConfirmacion() {
    this.mostrarDialogoConfirmacion();
  }

  guardarCambios() {
    // Realiza las validaciones antes de guardar
    this.validarNombre_Apellidos();
    this.validarCorreo();

    if (
      this.nombreValido &&
      this.primerApellidoValido &&
      this.segundoApellidoValido &&
      this.correoValido
    ) {
      // Aplica los cambios al usuario original solo cuando se presiona "Guardar"
      this.usuario.nombre = this.nombreEditado;
      this.usuario.primerApellido = this.primerApellidoEditado;
      this.usuario.segundoApellido = this.segundoApellidoEditado;
      this.usuario.email = this.correoEditado;
      this.usuario.rol = Array.isArray(this.selectedRole)
        ? this.selectedRole
        : [this.selectedRole];
      this.usuario.activo = this.estadoSeleccionado;

      // Cierra el modal
      this.activeModal.close();
    }
    console.log(this.usuario);

    this.editarUsuarioService.actualizarUsuario(this.usuario).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'CORRECTO',
          summary: res.message,
          duration: 4000,
        });
        this.closeModal();
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error,
          duration: 4000,
        });
      },
    });
  }
}
