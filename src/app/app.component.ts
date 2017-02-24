/* 3rd party modules */
import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Main app component
 */
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
export class AppComponent {/* */}
