import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

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
    const myToken = this.auth.obtenerToken(); // Obtener token

    if (myToken) {
      // Si existe el token
      request = request.clone({
        // Clonar la petición
        setHeaders: {
          // Agregar encabezados
          Authorization: `Bearer ${myToken}`, // Agregar token
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401!) {
            return this.handleUnauthorizedError(request, next);
          }
        }
        return throwError(() => err.error); // Retornar el error
      })
    );
  }
  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();

    tokenApiModel.accessToken = this.auth.obtenerToken()!;
    tokenApiModel.refreshToken = this.auth.obtenerRefreshToken()!;

    return this.auth.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.guardarRefreshToken(data.refreshToken);
        this.auth.guardarToken(data.accessToken);

        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` },
        });

        return next.handle(req);
      }),
      catchError(() => {
        return throwError(() => {
          this.toast.warning({
            detail: 'Alerta',
            summary:
              'Tu sesion ha expirado. Por favor, identificate de nuevo para continuar donde lo dejaste',
          });

          this.router.navigate(['/ingresar']);

          this.auth.cerrarSesion();
        });
      })
    );
  }
}
