import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7106/api/usuario/';
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

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(this.baseUrl + 'refrescar', tokenApi);
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
    console.log(helper.decodeToken(token));
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
