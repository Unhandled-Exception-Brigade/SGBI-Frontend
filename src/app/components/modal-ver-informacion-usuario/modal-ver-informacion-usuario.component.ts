import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-ver-informacion-usuario',
  templateUrl: './modal-ver-informacion-usuario.component.html',
  styleUrls: ['./modal-ver-informacion-usuario.component.css'],
})
export class ModalVerInformacionUsuarioComponent {
  @Input() usuario: any;
  public usuarios: any = [];
  public cedula: string = '';
  public nombre: string = '';
  public rol: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private api: ApiService,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private toast: NgToastService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.usuarioService.getRolUsuario().subscribe((val) => {
      const rolDelToken = this.auth.obtenerRolDelToken();
      this.rol = val || rolDelToken;
    });

    this.api.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res;
    });

    this.usuarioService.getNombreUsuario().subscribe((val) => {
      const nombreCompletoDelToken = this.auth.obtenerNombreDelToken();
      this.nombre = val || nombreCompletoDelToken;
    });

    if (this.rol == 'administrador') {
      this.api.obtenerUsuarios().subscribe((res) => {
        this.usuarios = res;
      });

      this.usuarioService.getCedulaUsuario().subscribe((val) => {
        const cedulaDelToken = this.auth.obtenerCedulaDelToken();
        this.cedula = val || cedulaDelToken;
      });
    } 
  }

  closeModal() {
    this.activeModal.close();
  }
}
