import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.obtenerToken(); // Obtener token
    if (token) {
      // Si existe el token
      request = request.clone({
        // Clonar la petición
        setHeaders: {
          // Agregar encabezados
          Authorization: `Bearer ${token}`, // Agregar token
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toast.warning({
              detail: 'Alerta',
              summary:
                'Tu sesion ha expirado. Por favor, identificate de nuevo para continuar donde lo dejaste',
            });
            this.router.navigate(['/ingresar']);
          }
        }
        return throwError(() => new Error('Ocurrio otro error'));
      })
    );
  }
}
