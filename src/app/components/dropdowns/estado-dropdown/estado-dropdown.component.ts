import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-estado-dropdown',
  templateUrl: './estado-dropdown.component.html',
  styleUrls: ['./estado-dropdown.component.css'],
})
export class EstadoDropdownComponent {
  @Input() estadoSeleccionado: string; // (activo, inactivo)
  @Output() estadoSeleccionadoOutput = new EventEmitter<boolean>();

  estado_establecido(estado: string) {
    if (estado == 'activo') {
      this.estadoSeleccionado = 'activo';
      this.estadoSeleccionadoOutput.emit(false);
    } else {
      this.estadoSeleccionado = 'inactivo';
      this.estadoSeleccionadoOutput.emit(true);
    }
  }
  
}
