import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:5005/api/usuario/';
  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get<any>(this.baseUrl);
  }
}
