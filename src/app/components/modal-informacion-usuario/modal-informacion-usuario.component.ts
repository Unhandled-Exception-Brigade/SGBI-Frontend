import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(public activeModal: NgbActiveModal, private editarUsuarioService: EditarUsuarioService) {}

  closeModal() {
    this.activeModal.close();
  }

  guardarCambios() {
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
