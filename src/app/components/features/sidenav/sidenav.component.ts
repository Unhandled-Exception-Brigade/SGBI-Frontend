import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { navbarData } from './nav-data';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/services/app-services/sidenav.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
  subMenu: boolean = false;

  mostrarSubMenu() {
    this.subMenu = !this.subMenu;
  }

  constructor(
    private toast: NgToastService,
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

  navData = navbarData;
  multiple: boolean = false;

  public nombre: string = '';
  public rol: string = '';

  ngOnInit() {
    this.usuarioService.getNombreUsuario().subscribe((val) => {
      const nombreDelToken = this.auth.obtenerNombreDelToken();
      this.nombre = val || nombreDelToken;
    });

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });
    
    this.usuarioService.getCedulaUsuario().subscribe((val) => {
      const nombreDelToken = this.auth.obtenerCedulaDelToken();
      this.nombre = val || nombreDelToken;
    });
    console.log('sidenav abierto');
  }

  cerrarSesion() {
    // Limpia los datos del usuario y redirige a la página de inicio de sesión.
    this.nombre = '';
    this.rol = '';

    this.auth.cerrarSesion();
    this.toast.info({
      detail: 'INFORMACION',
      summary: 'Sesión cerrada correctamente',
      duration: 2000,
    });
  }

  tienePermiso(permisos: string[]) {
    return permisos.includes(this.rol);
  }

  redirigirATramites() {
    this.Router.navigate(['/tramites']); // Redirige a la ruta '/tramites'
  }
}
