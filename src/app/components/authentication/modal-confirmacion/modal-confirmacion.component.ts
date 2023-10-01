import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css'],
})
export class ModalConfirmacionComponent {

  @Input() usuario;

  constructor(public activeModal: NgbActiveModal) {}

  confirmar() {
    this.activeModal.close('confirmado');
  }

  cancelar() {
    this.activeModal.close();
  }

}
