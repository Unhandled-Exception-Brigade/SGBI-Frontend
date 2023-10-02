import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CambiarContrasenaService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(
      `${this.baseURL}enviar-email-cambio-contrasena/${email}`,
      {}
    );
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(
      `${this.baseURL}resetear-contrasena`,
      resetPasswordObj
    );
  }
  resetPasswordFirstTime(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(
      `${this.baseURL}activar-cuenta`,
      resetPasswordObj
    );
  }
}
