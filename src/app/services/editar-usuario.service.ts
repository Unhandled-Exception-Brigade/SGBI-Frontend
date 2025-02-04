import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actualizarUsuario } from '../models/actualizar-usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditarUsuarioService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  actualizarUsuario(actualizarUsuarioObj: actualizarUsuario) {

    return this.http.post<any>(
      `${this.baseURL}cuenta/actualizar-usuario`,
      actualizarUsuarioObj
    );
  }
}
