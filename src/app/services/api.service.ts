import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.apiUrl+'cuenta/';
  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get<any>(this.baseUrl);
  }

  // buscarUsuarios(terminoBusqueda: string): Observable<any> {
  //   const url = `${this.baseUrl}/usuarios?busqueda=${terminoBusqueda}`;
  //   return this.http.get(url);
  // }
}