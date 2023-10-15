import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-informacion-usuario',
  templateUrl: './modal-informacion-usuario.component.html',
  styleUrls: ['./modal-informacion-usuario.component.css'],
})
export class ModalInformacionUsuarioComponent {
  @Input() usuario: any;
  editarUsuarioService: any;
  toast: any;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }

  guardarCambios() {
    // Aquí deberías utilizar el servicio EditarUsuarioService para enviar los cambios al backend
    // Por ejemplo:
    this.editarUsuarioService.actualizarUsuario(this.usuario).subscribe(
      (response) => {
        // Actualización exitosa
        // Puedes manejar una respuesta exitosa aquí, como mostrar una notificación
        this.toast.success('Usuario actualizado exitosamente.');
        this.activeModal.close();
      },
      (error) => {
        // Manejo de errores en caso de fallo en la actualización
        this.toast.error(
          'No se pudo actualizar el usuario. Inténtelo nuevamente.'
        );
      }
    );
  }
}
