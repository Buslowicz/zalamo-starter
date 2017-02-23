import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NamedRoutes } from './common/named-router';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nav>
      <a *ngFor="let route of menuItems"
       [routerLink]="route.route.path" routerLinkActive="active">{{route.name | stringFormat: 'startCase'}}</a>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  public menuItems = [];

  constructor(public router: NamedRoutes) {/* */}

  public ngOnInit() {
    this.menuItems = this.router.getAll(/View$/);
  }
}
