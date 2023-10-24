import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInformacionUsuarioComponent } from 'src/app/components/modal-informacion-usuario/modal-informacion-usuario.component';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css'],
})
export class ModalConfirmacionComponent {
  @Input() mensaje: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirmar() {
    this.activeModal.close('confirmado');
  }

  cancelar() {
    this.activeModal.dismiss('cancelado');
  }
}
