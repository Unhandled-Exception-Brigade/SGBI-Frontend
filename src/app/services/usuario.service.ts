import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private nombreUsuario$ = new BehaviorSubject<string>('');
  private rolUsuario$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRolUsuario() {
    return this.rolUsuario$.asObservable();
  }
  public setRolUsuario(rol: string) {
    this.rolUsuario$.next(rol);
  }

  public getNombreUsuario() {
    return this.nombreUsuario$.asObservable();
  }
  public setNombreUsuario(nombre: string) {
    this.nombreUsuario$.next(nombre);
  }
}
