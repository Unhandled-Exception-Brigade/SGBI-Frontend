import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public usuarios: any = [];

  public nombreCompleto: string = '';
  public rol: string = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService
  ) {}
  ngOnInit() {
    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
    });

    this.usuarioService.getNombreUsuario().subscribe((val) => {
      const nombreCompletoDelToken = this.auth.obtenerNombreDelToken();
      this.nombreCompleto = val || nombreCompletoDelToken;
    });

    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }
}
