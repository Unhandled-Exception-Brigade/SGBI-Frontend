import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const resetGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);

  if (authService.estaLogueado()) {
    return true;
  } else {
    toast.error({ detail: 'ERROR', summary: 'El link ya expiro' });
    router.navigate(['/ingresar']);
    return false;
  }
};
