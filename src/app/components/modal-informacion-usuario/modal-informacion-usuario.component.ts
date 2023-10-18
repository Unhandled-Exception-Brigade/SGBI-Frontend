import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioService } from 'src/app/services/editar-usuario.service';

@Component({
  selector: 'app-modal-informacion-usuario',
  templateUrl: './modal-informacion-usuario.component.html',
  styleUrls: ['./modal-informacion-usuario.component.css'],
})
export class ModalInformacionUsuarioComponent {
  @Input() usuario: any;
  selectedRole: string;
  estadoSeleccionado: string;
  toast: any;
  api: any;

  ngOnInit() {
    this.selectedRole = this.usuario.rol; // Inicializa el valor de selectedRole con el rol del usuario.
  }

  constructor(
    public activeModal: NgbActiveModal,
    private editarUsuarioService: EditarUsuarioService
  ) {}

  closeModal() {
    this.activeModal.close();
  }

  cambiarRol(nuevoRol: string) {
    this.selectedRole = nuevoRol;
  }

  guardarCambios() {
    this.usuario.rol = this.selectedRole; // Actualiza el rol del usuario con el valor seleccionado
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
