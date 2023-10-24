import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/authentication/reset/reset.component';
import { AgregarEmpleadoComponent } from './components/features/agregar-empleado/agregar-empleado.component';
import { GestionUsuariosComponent } from './components/features/gestion-usuarios/gestion-usuarios.component';
import { TramitesComponent } from './components/features/tramites/tramites.component';
import { CreacionTramitesComponent } from './components/features/creacion-tramites/creacion-tramites.component';
import { MantenimientoComponent } from './components/features/mantenimiento/mantenimiento.component';
import { ReporteriaComponent } from './components/features/reporteria/reporteria.component';
import { FirstEntryComponent } from './components/authentication/first-entry/first-entry.component';
import { MontoExonerarComponent } from './components/features/montos/monto-exonerar/monto-exonerar/monto-exonerar.component';
import { TarifaAseoViasSitiosPublicosComponent } from './components/features/montos/monto-exonerar/tarifa-aseo-vias-sitios-publicos/tarifa-aseo-vias-sitios-publicos/tarifa-aseo-vias-sitios-publicos.component';
import { TarifaMantenimientoParquesObrasOrnatoComponent } from './components/features/montos/monto-exonerar/tarifa-mantenimiento-parques-obras-ornato/tarifa-mantenimiento-parques-obras-ornato/tarifa-mantenimiento-parques-obras-ornato.component';
import { TarifaServicioRecoleccionBasuraComponent } from './components/features/montos/monto-exonerar/tarifa-servicio-recoleccion-basura/tarifa-servicio-recoleccion-basura/tarifa-servicio-recoleccion-basura.component';
import { BitacoraComponent } from './components/features/bitacora/bitacora.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tramites',
  },
  {
    path: 'ingresar',
    component: LoginComponent,
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
  {
    path: 'creacion-tramites',
    canActivate: [authGuard],
    component: CreacionTramitesComponent,
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
    path:'monto-exonerar',
    canActivate: [authGuard],
    component: MontoExonerarComponent
  },
  {
    path: 'tarifa-servicios-aseo-vias-y-sitios-publicos',
    canActivate: [authGuard],
    component: TarifaAseoViasSitiosPublicosComponent
  },
  {
    path: 'tarifa-mantenimiento-parques-obras-ornato',
    canActivate: [authGuard],
    component: TarifaMantenimientoParquesObrasOrnatoComponent
  },
  {
    path: 'tarifa-servicio-recoleccion-basura',
    canActivate: [authGuard],
    component: TarifaServicioRecoleccionBasuraComponent
  },
  {
    path: 'bitacora',
    canActivate: [authGuard],
    component: BitacoraComponent
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
