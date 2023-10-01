import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-role-dropdown',
  templateUrl: './role-dropdown.component.html',
  styleUrls: ['./role-dropdown.component.css'],
})
export class RoleDropdownComponent {
  @Input() selectedRole: string;
  @Output() roleSelected = new EventEmitter<string>();

  selectRole(role: string) {
    this.roleSelected.emit(role);
  }
}
