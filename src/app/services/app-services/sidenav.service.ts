import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  mostraSidenav: BehaviorSubject<boolean>;

  constructor() {
    this.mostraSidenav = new BehaviorSubject(true);
  }

  ocultar() {
    this.mostraSidenav.next(false);
  }

  mostar() {
    this.mostraSidenav.next(true);
  }
}
