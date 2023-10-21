import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { EditarUsuarioService } from 'src/app/services/editar-usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent {
  public usuarios: any = [];
  public cedula: string = '';
  public rol: string = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private toast: NgToastService,
    private router: Router,
    private editarUsuarioService: EditarUsuarioService
  ) {}

  ngOnInit() {
    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    if (this.rol == 'Administrador') {
      this.api.obtenerUsuarios().subscribe((res) => {
        this.usuarios = res;
      });

      this.usuarioService.getCedulaUsuario().subscribe((val) => {
        const cedulaDelToken = this.auth.obtenerCedulaDelToken();
        this.cedula = val || cedulaDelToken;
      });
    } else {
      this.toast.warning({
        detail: 'ADVERTENCIA',
        summary: 'No tiene los permisos para acceder a este modulo',
        duration: 4000,
      });

      this.router.navigate(['/tramites']);
    }
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }
}
