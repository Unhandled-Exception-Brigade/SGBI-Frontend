import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/ingresar',
  },
  {
    path: 'ingresar',
    component: LoginComponent,
  },
  {
    path: 'registrarse',
    component: SignupComponent,
  },
  {
    path: 'panel',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'resetear',
    component: ResetComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
