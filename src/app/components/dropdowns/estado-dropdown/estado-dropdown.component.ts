import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-estado-dropdown',
  templateUrl: './estado-dropdown.component.html',
  styleUrls: ['./estado-dropdown.component.css'],
})

export class EstadoDropdownComponent {
  @Input() estadoSeleccionado: boolean; // booleano (true o false)
  @Output() estadoSeleccionadoOutput = new EventEmitter<boolean>();

  estado_establecido(estado: boolean) {
    this.estadoSeleccionado = estado;
    this.estadoSeleccionadoOutput.emit(estado);
  }
}
