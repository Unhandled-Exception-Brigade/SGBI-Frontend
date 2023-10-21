import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;
  private usuarioPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    
  }

  registrarse(userFrontEnd: any) {
    return this.http.post<any>(this.baseUrl + 'cuenta/registrarse', userFrontEnd);
  }

  ingresar(userFrontEnd: any) {
    return this.http.post<any>(this.baseUrl + 'cuenta/ingresar', userFrontEnd);
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(this.baseUrl + 'cuenta/refrescar', tokenApi);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/ingresar']);
  }

  guardarToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  guardarRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }
  obtenerRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  estaLogueado(): boolean {
    return !!this.obtenerToken(); // Usa !! para convertir el valor en un booleano
  }
  decodedToken() {
    const helper = new JwtHelperService();
    const token = this.obtenerToken();

    return helper.decodeToken(token);
  }
  obtenerCedulaDelToken() {
    this.usuarioPayload = this.decodedToken();
    if (this.usuarioPayload) {
      return this.usuarioPayload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    }
    return '';
  }
  obtenerRolDelToken() {
    this.usuarioPayload = this.decodedToken();
    if (this.usuarioPayload) {
      return this.usuarioPayload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
    return '';
  }
  obtenerNombreDelToken() {
    this.usuarioPayload = this.decodedToken();
    if (this.usuarioPayload) {
      return this.usuarioPayload[
        'http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'
      ];
    }
    return '';
  }
}
