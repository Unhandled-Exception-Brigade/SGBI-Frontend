import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegistrarTarifaService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient){

  }

}
