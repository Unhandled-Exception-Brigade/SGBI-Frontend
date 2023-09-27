import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { AgregarEmpleadoComponent } from './components/agregar-empleado/agregar-empleado.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';

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
    path: 'resetear',
    component: ResetComponent,
  },
  {
    path: 'agregarEmpleado',
    canActivate: [authGuard],
    component: AgregarEmpleadoComponent,
  },
  {
    path: 'gestionUsuarios',
    canActivate: [authGuard],
    component: GestionUsuariosComponent,
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
