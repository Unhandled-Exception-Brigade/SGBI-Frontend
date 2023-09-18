import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class CambiarContrasenaService {
  private baseURL = 'http://localhost:5005/api/usuario';

  constructor(private http: HttpClient) {}

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseURL}/enviar/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(
      `${this.baseURL}/resetear-contrasena`,
      resetPasswordObj
    );
  }
}
