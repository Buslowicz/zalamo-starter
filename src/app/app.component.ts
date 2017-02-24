import { Component, ViewEncapsulation } from '@angular/core';
import { NamedRoutes } from './common/named-router';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nav>
      <a [routerLink]="['/home']" routerLinkActive="active">Home</a>
      <a [routerLink]="['/posts']" routerLinkActive="active">Posts</a>
      <a [routerLink]="['/about']" routerLinkActive="active">About</a>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
}
