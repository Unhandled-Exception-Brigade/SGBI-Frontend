import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  shouldShowSidenav(): boolean {
    // Obtén la ruta actual
    const currentRoute = this.router.url;

    // Verifica si la ruta actual no es '/login'
    return currentRoute !== '/login';
  }
}
