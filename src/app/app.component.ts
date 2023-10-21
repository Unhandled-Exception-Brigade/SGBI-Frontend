import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    if (environment.production) {
      console.log('Estamos en producción');
    } else {
      console.log('Estamos en desarrollo');
    }
  }

  shouldShowSidenav(): boolean {
    // Obtén la ruta actual
    const currentRoute = this.router.url;

    // Verifica si la ruta actual no es '/login'
    return currentRoute !== '/login';
  }
  
}
