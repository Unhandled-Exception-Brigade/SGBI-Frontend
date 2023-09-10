import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5005/api/usuario/';
  private usuarioPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.usuarioPayload = this.decodedToken();
  }

  registrarse(userFrontEnd: any) {
    return this.http.post<any>(this.baseUrl + 'registrarse', userFrontEnd);
  }

  ingresar(userFrontEnd: any) {
    return this.http.post<any>(this.baseUrl + 'ingresar', userFrontEnd);
  }
  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/ingresar']);
  }

  guardarToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  estaLogueado(): boolean {
    return !!this.obtenerToken(); // Usa !! para convertir el valor en un booleano
  }
  decodedToken() {
    const helper = new JwtHelperService();
    const token = this.obtenerToken();

    return helper.decodeToken(token);
  }
  obtenerNombreDelToken() {
    if (this.usuarioPayload) {
      return this.usuarioPayload.unique_name;
    }
  }
  obtenerRolDelToken() {
    if (this.usuarioPayload) {
      return this.usuarioPayload.role;
    }
  }
}
