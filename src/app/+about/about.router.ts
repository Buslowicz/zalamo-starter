/* 3rd party modules */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* Views */
import { AboutPageView } from './views/page.view';

const routes = [
  { path: 'about', component: AboutPageView },
  { path: 'about/:id', component: AboutPageView }
];

/**
 * Routes for About module
 */
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AboutRoutingModule {/* */}
