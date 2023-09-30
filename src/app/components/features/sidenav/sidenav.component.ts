import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { navbarData } from './nav-data';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/services/app-services/sidenav.service';
import {Router} from '@angular/router'

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  mostrarSideNav: boolean = true;
  suscripcion: Subscription;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private sideNavService: SidenavService,
    private Router: Router
  ) {
    this.suscripcion = this.sideNavService.mostraSidenav.subscribe((value) => {
      this.mostrarSideNav = value;
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  public cedula: string = '';
  public rol: string = '';

  ngOnInit() {
    this.screenWidth = window.innerWidth;

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();

      this.rol = val || rolDelToken;
    });

    this.usuarioService.getCedulaUsuario().subscribe((val) => {
      const cedulaDelToken = this.auth.obtenerCedulaDelToken();
      this.cedula = val || cedulaDelToken;
    });
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    window.location.reload(); // Recarga la página actual
  }

  tienePermiso(permisos: string[]) {
    return permisos.includes(this.rol);
  }

  redirigirATramites() {
    this.Router.navigate(['/tramites']); // Redirige a la ruta '/tramites'
  }
}
