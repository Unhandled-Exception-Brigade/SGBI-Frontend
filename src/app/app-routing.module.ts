import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { AgregarEmpleadoComponent } from './components/agregar-empleado/agregar-empleado.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { TramitesComponent } from './components/tramites/tramites.component';
import { CreacionTramitesComponent } from './components/creacion-tramites/creacion-tramites.component';
import { ConfiguracionUsuarioComponent } from './components/configuracion-usuario/configuracion-usuario.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { ReporteriaComponent } from './components/reporteria/reporteria.component';

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
    canActivate: [authGuard],
    component: ResetComponent,
  },
  {
    path: 'tramites',
    canActivate: [authGuard],
    component: TramitesComponent,
  },
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
