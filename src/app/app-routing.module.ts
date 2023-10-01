import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/authentication/reset/reset.component';
import { AgregarEmpleadoComponent } from './components/features/agregar-empleado/agregar-empleado.component';
import { GestionUsuariosComponent } from './components/features/gestion-usuarios/gestion-usuarios.component';
import { TramitesComponent } from './components/features/tramites/tramites.component';
import { CreacionTramitesComponent } from './components/features/creacion-tramites/creacion-tramites.component';
import { ConfiguracionUsuarioComponent } from './components/features/configuracion-usuario/configuracion-usuario.component';
import { MantenimientoComponent } from './components/features/mantenimiento/mantenimiento.component';
import { ReporteriaComponent } from './components/features/reporteria/reporteria.component';
import { FirstEntryComponent } from './components/authentication/first-entry/first-entry.component';

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
    canActivate: [authGuard],
    component: SignupComponent,
  },
  {
    path: 'resetear',
    component: ResetComponent,
  },
  {
    path: 'activar',
    component: FirstEntryComponent,
  },
  {
    path: 'tramites',
    canActivate: [authGuard],
    component: TramitesComponent,
  },
  //comentario xd
  {
    path: 'creacion-tramites',
    canActivate: [authGuard],
    component: CreacionTramitesComponent,
  },
  {
    path: 'configuracion-usuario',
    canActivate: [authGuard],
    component: ConfiguracionUsuarioComponent,
  },
  {
    path: 'mantenimiento',
    canActivate: [authGuard],
    component: MantenimientoComponent,
  },
  {
    path: 'reporteria',
    canActivate: [authGuard],
    component: ReporteriaComponent,
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
