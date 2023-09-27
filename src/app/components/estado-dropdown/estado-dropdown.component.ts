import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-estado-dropdown',
  templateUrl: './estado-dropdown.component.html',
  styleUrls: ['./estado-dropdown.component.css'],
})
export class EstadoDropdownComponent {
  @Input() estadoSeleccionado: string; // (activo, inactivo)
  @Output() estadoSeleccionadoOutput = new EventEmitter<string>();

  estado_establecido(estado: string) {
    this.estadoSeleccionadoOutput.emit(estado);
    console.log(estado);
  }
}
