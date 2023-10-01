import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7106/api/usuario/';
  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get<any>(this.baseUrl);
  }
}
