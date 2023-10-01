import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private cedulaUsuario$ = new BehaviorSubject<string>('');
  private rolUsuario$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRolUsuario() {
    return this.rolUsuario$.asObservable();
  }
  public setRolUsuario(rol: string) {
    this.rolUsuario$.next(rol);
  }

  public getCedulaUsuario() {
    return this.cedulaUsuario$.asObservable();
  }
  public setNombreUsuario(nombre: string) {
    this.cedulaUsuario$.next(nombre);
  }
}
