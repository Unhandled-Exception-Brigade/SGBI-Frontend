import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actualizarUsuario } from '../models/actualizar-usuario';

@Injectable({
  providedIn: 'root',
})
export class EditarUsuarioService {
  private baseURL = 'https://localhost:7106/api/usuario';

  constructor(private http: HttpClient) {}

  actualizarUsuario(actualizarUsuarioObj: actualizarUsuario) {
    console.log(actualizarUsuarioObj);

    return this.http.post<any>(
      `${this.baseURL}/actualizar-usuario`,
      actualizarUsuarioObj
    );
  }
}
