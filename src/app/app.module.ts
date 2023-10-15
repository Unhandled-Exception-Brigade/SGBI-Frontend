import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './helpers/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';
import { ResetComponent } from './components/authentication/reset/reset.component';
import { GestionUsuariosComponent } from './components/features/gestion-usuarios/gestion-usuarios.component';
import { AgregarEmpleadoComponent } from './components/features/agregar-empleado/agregar-empleado.component';
import { RoleDropdownComponent } from './components/dropdowns/role-dropdown/role-dropdown.component';
import { SidenavComponent } from './components/features/sidenav/sidenav.component';
import { CreacionTramitesComponent } from './components/features/creacion-tramites/creacion-tramites.component';
import { EstadoDropdownComponent } from './components/dropdowns/estado-dropdown/estado-dropdown.component';
import { MantenimientoComponent } from './components/features/mantenimiento/mantenimiento.component';
import { ReporteriaComponent } from './components/features/reporteria/reporteria.component';
import { TramitesComponent } from './components/features/tramites/tramites.component';
import { FirstEntryComponent } from './components/authentication/first-entry/first-entry.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { YearPickerComponent } from './components/dropdowns/year-picker/year-picker.component';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MontoExonerarComponent } from './components/features/montos/monto-exonerar/monto-exonerar/monto-exonerar.component';
import { TarifaAseoViasSitiosPublicosComponent } from './components/features/montos/monto-exonerar/tarifa-aseo-vias-sitios-publicos/tarifa-aseo-vias-sitios-publicos/tarifa-aseo-vias-sitios-publicos.component';
import { TarifaMantenimientoParquesObrasOrnatoComponent } from './components/features/montos/monto-exonerar/tarifa-mantenimiento-parques-obras-ornato/tarifa-mantenimiento-parques-obras-ornato/tarifa-mantenimiento-parques-obras-ornato.component';
import { TarifaServicioRecoleccionBasuraComponent } from './components/features/montos/monto-exonerar/tarifa-servicio-recoleccion-basura/tarifa-servicio-recoleccion-basura/tarifa-servicio-recoleccion-basura.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetComponent,
    GestionUsuariosComponent,
    AgregarEmpleadoComponent,
    RoleDropdownComponent,
    SidenavComponent,
    CreacionTramitesComponent,
    EstadoDropdownComponent,
    MantenimientoComponent,
    ReporteriaComponent,
    TramitesComponent,
    FirstEntryComponent,
    YearPickerComponent,
    MontoExonerarComponent,
    TarifaAseoViasSitiosPublicosComponent,
    TarifaMantenimientoParquesObrasOrnatoComponent,
    TarifaServicioRecoleccionBasuraComponent
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
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CalendarModule,
    InputMaskModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    InputNumberModule,
    DropdownModule,
    BreadcrumbModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
