import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './helpers/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';
import { ResetComponent } from './components/reset/reset.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { AgregarEmpleadoComponent } from './components/agregar-empleado/agregar-empleado.component';
import { RoleDropdownComponent } from './components/role-dropdown/role-dropdown.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfiguracionUsuarioComponent } from './components/configuracion-usuario/configuracion-usuario.component';
import { CreacionTramitesComponent } from './components/creacion-tramites/creacion-tramites.component';
import { EstadoDropdownComponent } from './components/estado-dropdown/estado-dropdown.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { ReporteriaComponent } from './components/reporteria/reporteria.component';
import { TramitesComponent } from './components/tramites/tramites.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

    ResetComponent,
    GestionUsuariosComponent,
    AgregarEmpleadoComponent,
    RoleDropdownComponent,
    SidenavComponent,
    ConfiguracionUsuarioComponent,
    CreacionTramitesComponent,
    EstadoDropdownComponent,
    MantenimientoComponent,
    ReporteriaComponent,
    TramitesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
