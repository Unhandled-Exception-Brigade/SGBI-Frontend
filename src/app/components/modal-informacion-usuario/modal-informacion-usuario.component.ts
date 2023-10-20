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

  constructor(
    public activeModal: NgbActiveModal,
    private editarUsuarioService: EditarUsuarioService,
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
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

  guardarCambios() {
    this.usuario.rol = this.selectedRole; // Actualiza el rol del usuario con el valor seleccionado
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
