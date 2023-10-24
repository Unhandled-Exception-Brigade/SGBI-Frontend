import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { registrarTarifa } from '../../models/registrar-tarifa'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class tarifaService {
  private baseUrl: string = environment.apiUrl+'tarifa/';
  private montoColones$ = new BehaviorSubject<number>(0);
  private descripcion$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  registrarTarifa(registro: any) {
    return this.http.post<any>(
      `${this.baseUrl}registrar`,registro
    );
  }

  obtenerTarifas() {
    return this.http.get<any>(this.baseUrl+'listar');
  }

  listarMontosExonerar() {
    return this.http.get<any>(this.baseUrl+'listar/exonerar');
  }

  listarMantenimiento(){
    return this.http.get<any>(this.baseUrl+'listar/mantenimiento');
  }

  listarServiciosAseo(){
    return this.http.get<any>(this.baseUrl+'listar/servicios-aseo');
  }

  listarServiciosBasura(){
    return this.http.get<any>(this.baseUrl+'listar/servicios-basura');
  }

  public obtenerMontoColones(){
    return this.montoColones$.asObservable();
  }

  public obtenerDescripcion(){
    return this.descripcion$.asObservable();
  }

}
